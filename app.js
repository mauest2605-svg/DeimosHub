// Cambia este número por el WhatsApp donde recibirás los pedidos.
const WHATSAPP_NUMBER = '522291061545';
const ADMIN_PASSWORD = 'Mbml.442326/';
const STORAGE_KEY = 'deimos-exclusive-catalog';
const LEGACY_STORAGE_KEY = 'luna-mercado-products';
const recoveredProducts = [
  { id: 101, name: 'Auriculares Bluetooth 5.3 In-ear Gamer Inalámbricos Keluona Air31 T6', description: 'Auriculares gamer inalámbricos con Bluetooth 5.3, baja latencia y luz LED.', price: 150, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 102, name: 'Micrófono Dinámico Maono PD200X USB y XLR', description: 'Micrófono dinámico para streaming, gaming y podcast con conexión USB/XLR.', price: 1700, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 103, name: 'Micrófono USB Qfun HK2 para PC Gamer con RGB', description: 'Micrófono USB con RGB, cancelación de ruido y botón de silencio.', price: 650, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 104, name: 'Audífonos Inalámbricos Bluetooth Diadema Gamer Kri', description: 'Audífonos Bluetooth con opción de cable, batería de larga duración y luz de respiración.', price: 450, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 105, name: 'Audífonos Gamer In-Ear Occiam GM06 con Cancelación de Ruido', description: 'Audífonos in-ear con ANC, modo de juego de baja latencia y luces RGB.', price: 650, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 106, name: 'Mouse Pad Impermeable 800x300 + 3 Bridas', description: 'Mouse pad amplio con superficie de microfibra, base antideslizante y organizadores de cables.', price: 250, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 107, name: 'RGB Mouse Pad Gamer 300x800x4mm Free Wolf', description: 'Alfombrilla RGB con 14 estilos de iluminación, conexión USB y base antideslizante.', price: 350, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 108, name: 'Mouse Pad Grande XL 800x300x3mm Free Wolf', description: 'Alfombrilla XXL impermeable con superficie suave y base de goma antideslizante.', price: 450, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 109, name: 'AULA Custom Teclado Mecánico F75 RGB', description: 'Teclado mecánico inalámbrico con retroiluminación RGB y diseño del 75%.', price: 1600, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 110, name: 'Teclado AULA F75 Gasket Mecánico Inalámbrico', description: 'Teclado AULA F75 con Bluetooth, 2.4 GHz, USB-C y switches intercambiables.', price: 1600, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 111, name: 'Ratón Inalámbrico Gamer Bluetooth Inphic A1', description: 'Ratón recargable con tres modos de conexión, pantalla de batería y tres niveles de DPI.', price: 700, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 112, name: 'Mouse Gamer Inalámbrico Ajazz AJ139V2', description: 'Mouse gamer de tres modos con sensor PAW3311, USB-C y hasta 12000 DPI.', price: 900, category: 'Accesorios', image: 'deimos-logo.png' },
  { id: 113, name: 'Audífonos In-ear Bluetooth para Celulares, Tablets y Laptops', description: 'Audífonos Bluetooth compactos compatibles con celulares, tablets y laptops.', price: 700, category: 'Accesorios', image: 'deimos-logo.png' }
];

const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const productCount = document.getElementById('productCount');
const supplementsMessage = document.getElementById('supplementsMessage');
const searchInput = document.getElementById('searchInput');
const dialog = document.getElementById('productDialog');
const productForm = document.getElementById('productForm');
const adminDialog = document.getElementById('adminDialog');
const adminForm = document.getElementById('adminForm');
const adminPassword = document.getElementById('adminPassword');
const adminError = document.getElementById('adminError');
const previewDialog = document.getElementById('previewDialog');
const previewImage = document.getElementById('previewImage');
const previewName = document.getElementById('previewName');
const previewDescription = document.getElementById('previewDescription');
const previewPrice = document.getElementById('previewPrice');
const previewOrder = document.getElementById('previewOrder');
const videoEditor = document.getElementById('videoEditor');
const previewVideoInput = document.getElementById('previewVideoInput');
const videoPreview = document.getElementById('videoPreview');
const proteinOptionsEditor = document.getElementById('proteinOptionsEditor');
const flavorRows = document.getElementById('flavorRows');
const colorOptionsEditor = document.getElementById('colorOptionsEditor');
const colorRows = document.getElementById('colorRows');
const categoryInput = document.getElementById('categoryInput');
const proteinPicker = document.getElementById('proteinPicker');
const proteinType = document.getElementById('proteinType');
const colorPicker = document.getElementById('colorPicker');
const colorType = document.getElementById('colorType');
const previewSpecs = document.getElementById('previewSpecs');
const previewDescriptionToggle = document.getElementById('previewDescriptionToggle');
const rulesDialog = document.getElementById('rulesDialog');
const agreeButton = document.getElementById('agreeButton');
const countdown = document.getElementById('countdown');
const selectedProduct = document.getElementById('selectedProduct');
const toast = document.getElementById('toast');
let toastTimer;
let rulesTimer;
let pendingProduct;
let previewProduct;
let selectedCategory = 'Accesorios';
let editingProduct;
let isAdmin = false;
const quantities = new Map();
const proteinVariants = {
  whey: { name: 'Whey Protein Clásica', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=85', description: 'Proteína de suero de leche para apoyar la recuperación y el crecimiento muscular.', specs: '24 g de proteína · Ideal después de entrenar' },
  isolate: { name: 'Whey Isolate Premium', image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=85', description: 'Aislado de proteína de rápida absorción, ligero y bajo en grasas.', specs: '27 g de proteína · Alta pureza · Fácil digestión' },
  vegan: { name: 'Proteína Vegana', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85', description: 'Mezcla vegetal de chícharo y arroz para complementar tu rutina de forma natural.', specs: '21 g de proteína · 100% vegetal · Sin lactosa' },
  gainer: { name: 'Mass Gainer', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=85', description: 'Fórmula alta en calorías para apoyar el aumento de masa y energía.', specs: '35 g de proteína · Alto aporte energético' }
};
const localProductImages = [
  { match: /maono\s*pd200x/i, image: './Micrófono Dinámico Maono PD200X USB y XLR.webp' },
  { match: /qfun\s*hk2/i, image: './Micrófono USB Qfun HK2 para PC Gamer con RGB.webp' },
  { match: /krios/i, image: './Audifonos Inalambricos Bluetooth Diadema Audífonos Gamer Krios H2 Con Microfono 650 Mah Luz Plegable Aux 3.5mm Para Xbox Pc Ps4.webp' },
  { match: /occ[ií]am\s*gm06/i, image: './Audífonos Gamer In-Ear Occiam GM06 con Cancelación de Ruido.webp' },
  { match: /inphic\s*a1/i, image: './Ratón Inalámbrico Gamer Bluetooth Recargable Negro Conexión USB-C 3 DPI Inphic A1.webp' },
  { match: /ajazz\s*aj139/i, image: './Mouse Gamer Inalámbrico Ajazz AJ139V2 MC PAW3311 12000 DPI Bluetooth.webp' },
  { match: /aula.*f75|teclado.*f75/i, image: './Teclado Mecanico Aula F75.webp' },
  { match: /rgb.*mouse\s*pad|mouse\s*pad.*luz\s*rgb/i, image: './Mouse Pad Gamer Grande 80x30cm Luz Rgb Alfombrilla De Ratón.webp' }
];
const mousepadColors = [
  { id: 'color-white', color: 'Blanco', name: 'Mouse Pad 800x300 Blanco', image: './Mouse Pad Impermeable 800x300 + 3 Bridas color blanco.webp', description: 'Mouse pad blanco con diseño de líneas topográficas y tres bridas organizadoras.' },
  { id: 'color-black', color: 'Negro', name: 'Mouse Pad 800x300 Negro', image: './Mouse Pad Impermeable 800x300 + 3 Bridas color negro.webp', description: 'Mouse pad negro con diseño de líneas topográficas y tres bridas organizadoras.' }
];
let products = loadProducts();
function normalizeProductImages(catalog) {
  return catalog.map((product) => {
    const productName = String(product.name || '');
    const match = localProductImages.find((item) => item.match.test(productName));
    const hasUploadedImage = typeof product.image === 'string' && product.image.startsWith('data:');
    const normalized = match && !hasUploadedImage ? { ...product, image: match.image } : { ...product };
    if (/mouse\s*pad.*800x300|mouse\s*pad.*800\*300|mouse\s*pad.*3\s*bridas/i.test(productName)) {
      normalized.image = mousepadColors[0].image;
      normalized.colorVariants = mousepadColors;
      normalized.colorType = product.colorType && mousepadColors.some((item) => item.id === product.colorType) ? product.colorType : mousepadColors[0].id;
    }
    return normalized;
  });
}

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const catalog = saved ? JSON.parse(saved) : recoveredProducts;
    return normalizeProductImages(Array.isArray(catalog) && catalog.length ? catalog : recoveredProducts);
  } catch { return normalizeProductImages(recoveredProducts); }
}
function setAdminMode(enabled) {
  isAdmin = enabled;
  document.body.classList.toggle('admin-mode', enabled);
  document.querySelectorAll('.admin-only').forEach((element) => { element.hidden = !enabled; });
  renderProducts();
}
function requestAdminAccess() {
  adminError.hidden = true;
  adminPassword.value = '';
  adminDialog.showModal();
  adminPassword.focus();
}
function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch {
    showToast('No se pudo guardar: la imagen es demasiado grande para el almacenamiento del navegador.');
    return false;
  }
}
function formatPrice(price) { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price); }
function getProteinVariants(product) {
  if (Array.isArray(product.proteinVariants) && product.proteinVariants.length) return Object.fromEntries(product.proteinVariants.map((item, index) => [item.id || `flavor-${index}`, item]));
  return proteinVariants;
}
function renderFlavorRows(variants = []) {
  flavorRows.innerHTML = variants.map((variant, index) => `<div class="flavor-row"><input data-flavor="name" value="${variant.flavor || ''}" placeholder="Sabor (ej. Chocolate)"><input data-flavor="title" value="${variant.name || ''}" placeholder="Título del producto"><input data-flavor="image" value="${variant.image || ''}" placeholder="URL de imagen"><textarea data-flavor="description" rows="2" placeholder="Descripción y especificaciones">${variant.description || ''}</textarea><button class="remove-flavor" type="button" aria-label="Eliminar sabor">×</button></div>`).join('');
}
function renderColorRows(variants = []) {
  colorRows.innerHTML = variants.map((variant) => `<div class="flavor-row"><input data-color="name" value="${variant.color || ''}" placeholder="Color (ej. Negro)"><input data-color="title" value="${variant.name || ''}" placeholder="Nombre de la variante"><input data-color="image" value="${variant.image || ''}" placeholder="URL de imagen"><textarea data-color="description" rows="2" placeholder="Descripción del color">${variant.description || ''}</textarea><button class="remove-color" type="button" aria-label="Eliminar color">×</button></div>`).join('');
}
function collectProteinVariants() {
  return [...flavorRows.querySelectorAll('.flavor-row')].map((row, index) => ({ id: `flavor-${index}`, flavor: row.querySelector('[data-flavor="name"]').value.trim(), name: row.querySelector('[data-flavor="title"]').value.trim(), image: row.querySelector('[data-flavor="image"]').value.trim(), description: row.querySelector('[data-flavor="description"]').value.trim(), specs: row.querySelector('[data-flavor="description"]').value.trim() })).filter((item) => item.flavor || item.name || item.description || item.image);
}
function collectColorVariants() {
  return [...colorRows.querySelectorAll('.flavor-row')].map((row, index) => ({ id: `color-${index}`, color: row.querySelector('[data-color="name"]').value.trim(), name: row.querySelector('[data-color="title"]').value.trim(), image: row.querySelector('[data-color="image"]').value.trim(), description: row.querySelector('[data-color="description"]').value.trim() })).filter((item) => item.color || item.name || item.description || item.image);
}
function isMousepad(productName) { return /mouse\s*pad|mousepad|alfombrilla/i.test(productName || ''); }
function toggleProductVariantEditors() {
  proteinOptionsEditor.hidden = categoryInput.value !== 'Suplementos';
  colorOptionsEditor.hidden = !isMousepad(document.getElementById('nameInput').value);
}
function getCategory(product) {
  if (product.category) return product.category;
  return /prote[ií]na|creatina|suplement|vitamina|pre[- ]?workout/i.test(`${product.name} ${product.description}`) ? 'Suplementos' : 'Accesorios';
}
function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => getCategory(product) === selectedCategory).filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(query));
  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card" data-product="${product.id}">
      <img class="product-image" src="${product.image || 'deimos-logo.png'}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='deimos-logo.png';">
      ${isAdmin ? `<button class="delete-button admin-only" type="button" data-delete="${product.id}" aria-label="Eliminar ${product.name}">×</button>` : ''}
      <div class="product-body"><h3>${product.name}</h3><p class="product-description">${product.description}</p><button class="description-toggle" type="button" data-description="${product.id}">↘ Ver descripción completa</button><div class="product-meta"><span class="price">${formatPrice(product.price)}</span><div class="purchase-controls"><div class="quantity-control" aria-label="Cantidad de ${product.name}"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Reducir cantidad">−</button><span data-quantity-value="${product.id}">${quantities.get(product.id) || 1}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Aumentar cantidad">+</button></div>${isAdmin ? `<button class="edit-button admin-only" type="button" data-edit="${product.id}" aria-label="Editar ${product.name}">✎</button>` : ''}<button class="order-button" type="button" data-order="${product.id}">Pedir por WhatsApp ↗</button></div></div></div>
    </article>`).join('');
  productCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'producto' : 'productos'}`;
  supplementsMessage.hidden = selectedCategory !== 'Suplementos';
  emptyState.hidden = visibleProducts.length > 0;
}
function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000); }
function youtubeOrVimeoEmbed(url) {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return '';
}
function renderVideo(url) {
  if (!url) { videoPreview.innerHTML = '<p>Añade un video para mostrar más detalles del producto.</p>'; return; }
  const embedUrl = youtubeOrVimeoEmbed(url);
  videoPreview.innerHTML = embedUrl ? `<iframe src="${embedUrl}" title="Video del producto" allowfullscreen></iframe>` : `<video src="${url}" controls playsinline></video>`;
}
function openPreview(product) {
  previewProduct = product;
  const variants = getProteinVariants(product);
  proteinPicker.hidden = getCategory(product) !== 'Suplementos';
  proteinType.innerHTML = Object.entries(variants).map(([key, variant]) => `<option value="${key}">${variant.flavor || variant.name}</option>`).join('');
  proteinType.value = product.proteinType && variants[product.proteinType] ? product.proteinType : Object.keys(variants)[0];
  const colors = Array.isArray(product.colorVariants) ? Object.fromEntries(product.colorVariants.map((item, index) => [item.id || `color-${index}`, item])) : {};
  colorPicker.hidden = !isMousepad(product.name) || !Object.keys(colors).length;
  colorType.innerHTML = Object.entries(colors).map(([key, variant]) => `<option value="${key}">${variant.color || variant.name}</option>`).join('');
  colorType.value = product.colorType && colors[product.colorType] ? product.colorType : Object.keys(colors)[0] || '';
  updateProteinPreview();
  previewVideoInput.value = product.video || '';
  videoEditor.hidden = true;
  renderVideo(product.video);
  previewDialog.showModal();
}
function updateProteinPreview() {
  const variant = getProteinVariants(previewProduct)[proteinType.value];
  const isProtein = previewProduct && getCategory(previewProduct) === 'Suplementos';
  const colorVariants = Array.isArray(previewProduct?.colorVariants) ? Object.fromEntries(previewProduct.colorVariants.map((item, index) => [item.id || `color-${index}`, item])) : {};
  const color = colorVariants[colorType.value];
  const name = isProtein ? variant.name : (color?.name || previewProduct.name);
  previewName.textContent = name;
  previewDescription.textContent = isProtein ? variant.description : (color?.description || previewProduct.description);
  previewDescription.classList.remove('expanded');
  previewDescriptionToggle.textContent = '↘ Ver descripción completa';
  previewSpecs.textContent = isProtein ? variant.specs : '';
  previewPrice.textContent = formatPrice(previewProduct.price);
  previewImage.src = isProtein ? variant.image : (color?.image || previewProduct.image || 'deimos-logo.png');
  previewImage.alt = name;
}
function orderProduct(product, quantity = 1) {
  pendingProduct = product;
  selectedProduct.textContent = `Producto seleccionado: ${product.name} · ${quantity} unidad${quantity === 1 ? '' : 'es'} · ${formatPrice(product.price * quantity)}`;
  let seconds = 10;
  agreeButton.disabled = true;
  countdown.textContent = `Podrás aceptar en ${seconds} segundos`;
  clearInterval(rulesTimer);
  rulesTimer = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) {
      clearInterval(rulesTimer);
      countdown.textContent = 'Ya puedes continuar con tu pedido';
      agreeButton.disabled = false;
      return;
    }
    countdown.textContent = `Podrás aceptar en ${seconds} segundos`;
  }, 1000);
  rulesDialog.showModal();
}
function openWhatsApp(product) {
  const protein = getCategory(product) === 'Suplementos' ? getProteinVariants(product)[product.proteinType || Object.keys(getProteinVariants(product))[0]] : null;
  const color = Array.isArray(product.colorVariants) ? product.colorVariants.find((item) => item.id === product.colorType) : null;
  const productName = protein ? protein.name : (color?.name || product.name);
  const quantity = quantities.get(product.id) || 1;
  const message = `Hola, quiero pedir ${quantity} unidad${quantity === 1 ? '' : 'es'} del producto «${productName}» por ${formatPrice(product.price * quantity)}.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

document.getElementById('openForm').addEventListener('click', () => { if (!isAdmin) return; editingProduct = null; productForm.reset(); renderFlavorRows(); renderColorRows(); toggleProductVariantEditors(); document.querySelector('#productDialog h2').textContent = 'Añadir producto'; dialog.showModal(); });
document.getElementById('adminAccess').addEventListener('click', requestAdminAccess);
adminForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (adminPassword.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('deimos-admin', 'true');
    adminDialog.close();
    setAdminMode(true);
    showToast('Modo administrador activado.');
    return;
  }
  adminError.hidden = false;
  adminPassword.select();
});
document.getElementById('closeAdmin').addEventListener('click', () => adminDialog.close());
document.getElementById('cancelAdmin').addEventListener('click', () => adminDialog.close());
if (sessionStorage.getItem('deimos-admin') === 'true') setAdminMode(true); else setAdminMode(false);
categoryInput.addEventListener('change', toggleProductVariantEditors);
document.getElementById('nameInput').addEventListener('input', toggleProductVariantEditors);
document.getElementById('addFlavorButton').addEventListener('click', () => { const variants = collectProteinVariants(); variants.push({}); renderFlavorRows(variants); });
flavorRows.addEventListener('click', (event) => { if (event.target.classList.contains('remove-flavor')) { event.target.closest('.flavor-row').remove(); } });
document.getElementById('addColorButton').addEventListener('click', () => { const variants = collectColorVariants(); variants.push({}); renderColorRows(variants); });
colorRows.addEventListener('click', (event) => { if (event.target.classList.contains('remove-color')) { event.target.closest('.flavor-row').remove(); } });
document.getElementById('imageFileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const imagePreview = document.getElementById('imageEditPreview');
  if (!file) return;
  imagePreview.src = URL.createObjectURL(file);
  imagePreview.hidden = false;
});
document.querySelectorAll('[value="cancel"]').forEach((button) => button.addEventListener('click', () => dialog.close()));
document.getElementById('closeRules').addEventListener('click', () => { clearInterval(rulesTimer); rulesDialog.close(); });
agreeButton.addEventListener('click', () => { rulesDialog.close(); openWhatsApp(pendingProduct); pendingProduct = null; });
document.getElementById('closePreview').addEventListener('click', () => previewDialog.close());
previewDescriptionToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const expanded = previewDescription.classList.toggle('expanded');
  previewDescriptionToggle.textContent = expanded ? '↗ Ocultar descripción' : '↘ Ver descripción completa';
});
proteinType.addEventListener('change', () => { updateProteinPreview(); previewProduct.proteinType = proteinType.value; });
colorType.addEventListener('change', () => { updateProteinPreview(); previewProduct.colorType = colorType.value; });
document.getElementById('addVideoButton').addEventListener('click', () => { if (!isAdmin) return; videoEditor.hidden = false; previewVideoInput.focus(); });
document.getElementById('saveVideoButton').addEventListener('click', () => {
  const url = previewVideoInput.value.trim();
  if (!url) { showToast('Introduce un enlace de video.'); return; }
  previewProduct.video = url;
  products = products.map((product) => product.id === previewProduct.id ? previewProduct : product);
  saveProducts(); renderVideo(url); videoEditor.hidden = true; showToast('Video añadido a la vista previa.');
});
previewOrder.addEventListener('click', () => { previewDialog.close(); orderProduct(previewProduct, quantities.get(previewProduct.id) || 1); });
productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.submitter?.value === 'cancel') { dialog.close(); return; }
  const formData = new FormData(productForm);
  const imageFile = document.getElementById('imageFileInput').files[0];
  const saveProduct = (image) => {
    const enteredPrice = document.getElementById('priceInput').value.trim();
    const product = { id: Date.now(), name: document.getElementById('nameInput').value.trim(), description: document.getElementById('descriptionInput').value.trim(), category: document.getElementById('categoryInput').value, proteinVariants: categoryInput.value === 'Suplementos' ? collectProteinVariants() : (editingProduct?.proteinVariants || []), colorVariants: isMousepad(document.getElementById('nameInput').value) ? collectColorVariants() : (editingProduct?.colorVariants || []), price: enteredPrice === '' ? editingProduct?.price : Number(enteredPrice), image: image || editingProduct?.image || document.getElementById('imageInput').value.trim(), video: document.getElementById('videoInput').value.trim() || editingProduct?.video || '' };
    if (editingProduct) {
      products = products.map((item) => item.id === editingProduct.id ? { ...editingProduct, ...product, id: editingProduct.id } : item);
      showToast('Producto actualizado.');
    } else {
      products.unshift(product);
      showToast('Producto añadido al catálogo.');
    }
    saveProducts(); renderProducts(); dialog.close(); editingProduct = null;
  };
  if (imageFile) {
    const reader = new FileReader();
    reader.addEventListener('load', () => saveProduct(reader.result));
    reader.readAsDataURL(imageFile);
  } else saveProduct(document.getElementById('imageInput').value.trim());
});
productGrid.addEventListener('click', (event) => {
  const orderId = event.target.dataset.order;
  const deleteId = event.target.dataset.delete;
  const editId = event.target.dataset.edit;
  const descriptionId = event.target.dataset.description;
  const quantityId = event.target.dataset.quantity;
  const productCard = event.target.closest('.product-card');
  if (quantityId) {
    const productId = Number(quantityId);
    const nextQuantity = Math.max(1, (quantities.get(productId) || 1) + Number(event.target.dataset.change));
    quantities.set(productId, nextQuantity);
    const quantityValue = productCard.querySelector(`[data-quantity-value="${productId}"]`);
    if (quantityValue) quantityValue.textContent = nextQuantity;
    event.stopPropagation();
    return;
  }
  if (orderId) orderProduct(products.find((product) => product.id === Number(orderId)), quantities.get(Number(orderId)) || 1);
  if (descriptionId) {
    const description = event.target.previousElementSibling;
    const expanded = description.classList.toggle('expanded');
    event.target.textContent = expanded ? '↗ Ocultar descripción' : '↘ Ver descripción completa';
    event.stopPropagation();
  }
  if (editId && isAdmin) {
    editingProduct = products.find((product) => product.id === Number(editId));
    document.querySelector('#productDialog h2').textContent = 'Editar producto';
    document.getElementById('nameInput').value = editingProduct.name;
    document.getElementById('descriptionInput').value = editingProduct.description;
    document.getElementById('priceInput').value = editingProduct.price;
    document.getElementById('categoryInput').value = getCategory(editingProduct);
    renderFlavorRows(editingProduct.proteinVariants || []);
    renderColorRows(editingProduct.colorVariants || []);
    toggleProductVariantEditors();
    document.getElementById('imageInput').value = editingProduct.image?.startsWith('data:') ? '' : editingProduct.image || '';
    const imagePreview = document.getElementById('imageEditPreview');
    imagePreview.src = editingProduct.image || '';
    imagePreview.hidden = !editingProduct.image;
    document.getElementById('videoInput').value = editingProduct.video || '';
    document.getElementById('imageFileInput').value = '';
    dialog.showModal();
  }
  if (deleteId && isAdmin && confirm('¿Eliminar este producto del catálogo?')) { products = products.filter((product) => product.id !== Number(deleteId)); saveProducts(); renderProducts(); showToast('Producto eliminado.'); }
  if (!orderId && !deleteId && !editId && !descriptionId && productCard) openPreview(products.find((product) => product.id === Number(productCard.dataset.product)));
});
searchInput.addEventListener('input', renderProducts);
document.querySelectorAll('.catalog-tab').forEach((tab) => tab.addEventListener('click', () => {
  selectedCategory = tab.dataset.category;
  document.querySelectorAll('.catalog-tab').forEach((item) => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab ? 'true' : 'false'); });
  renderProducts();
}));
renderProducts();
