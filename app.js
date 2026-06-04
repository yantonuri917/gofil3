/**
 * Inisialisasi Supabase
 */
const supabaseClient = supabase.createClient(
    'https://cxxgioehprdzmyghdgim.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGdpb2VocHJkem15Z2hkZ2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzI2MjYsImV4cCI6MjA5NTUwODYyNn0.UsYsI99x-kiEnrBF9U5QsCq7H9XdF5a4_g4mKRizBxw'
);

// Variabel Utama
let allVideos = [];
let currentPage = 1;
const itemsPerPage = 5;

/**
 * Logika Tab Terbalik (Iklan)
 */
function handlePlay(id, type, url) {
    const urlIklan = 'https://braverybreezebinding.com/dyu6kzr44?key=703bc4908bfdd21b148e4fe03f9810cb';
    window.open(window.location.origin + window.location.pathname + '?play=' + id, '_blank');
    window.location.replace(urlIklan);
}

/**
 * Ambil data dan tampilkan
 */
async function fetchAndRenderVideos() {
    const { data } = await supabaseClient.from('videos_list').select('*');
    allVideos = data || [];
    renderPage();
}

/**
 * Render Daftar File & Paginasi
 */
function renderPage() {
    const container = document.getElementById('file-list-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = allVideos.slice(start, start + itemsPerPage);

    paginatedItems.forEach(video => {
        const type = video.url.includes('embed') ? 'embed' : 'mp4';
        const row = document.createElement('div');
        row.className = "flex items-center gap-6 p-5 border-b border-gray-700 hover:bg-gray-800 transition";
        row.innerHTML = `
            <input type="checkbox" class="w-5 h-5 hidden md:block">
            <i class="fas fa-file-video text-blue-500 text-2xl"></i>
            <div class="bg-black rounded-lg border-2 border-gray-600 cursor-pointer overflow-hidden flex items-center justify-center shrink-0 shadow-xl" 
                 style="width: 180px; height: 135px;" onclick="handlePlay('${video.id}', '${type}', '${video.url}')">
                 <video src="${video.url}" class="w-full h-full" style="object-fit: contain;"></video>
            </div>
            <span class="flex-1 text-lg text-gray-100 font-semibold truncate pl-2">${video.name}</span>
            <button onclick="handlePlay('${video.id}', '${type}', '${video.url}')" class="text-blue-400 hover:text-white text-2xl pr-4"><i class="fas fa-play-circle"></i></button>
        `;
        container.appendChild(row);
    });

    renderPagination();

    const params = new URLSearchParams(window.location.search);
    const playId = params.get('play');
    if (playId) {
        const video = allVideos.find(v => v.id == playId);
        if (video) showVideoModal(video.url, video.url.includes('embed') ? 'embed' : 'mp4');
    }
}

function renderPagination() {
    const container = document.getElementById('file-list-container');
    const totalPages = Math.ceil(allVideos.length / itemsPerPage);
    if (totalPages <= 1) return;
    
    const nav = document.createElement('div');
    nav.className = "flex justify-center gap-2 p-6";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = `px-4 py-2 rounded ${currentPage === i ? 'bg-blue-600' : 'bg-gray-700'} text-white font-bold`;
        btn.onclick = () => { currentPage = i; renderPage(); window.scrollTo(0, 0); };
        nav.appendChild(btn);
    }
    container.appendChild(nav);
}

function showVideoModal(url, type) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4";
    modal.innerHTML = `
        <div class="w-full flex flex-col items-center">
            ${type === 'embed' ? `<iframe src="${url}" class="w-full max-w-5xl h-[75vh]" allow="autoplay; fullscreen" allowfullscreen></iframe>` 
                               : `<video src="${url}" controls autoplay muted playsinline class="w-full max-w-5xl h-[75vh]"></video>`}
            <button onclick="window.location.href = window.location.origin + window.location.pathname" 
                    class="mt-6 text-white bg-gray-800 px-8 py-3 rounded-full hover:bg-gray-700 transition font-bold shadow-lg">
                &larr; Kembali ke Daftar
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', fetchAndRenderVideos);
