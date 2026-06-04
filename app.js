
const supabaseClient = supabase.createClient(
    'https://cxxgioehprdzmyghdgim.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGdpb2VocHJkem15Z2hkZ2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzI2MjYsImV4cCI6MjA5NTUwODYyNn0.UsYsI99x-kiEnrBF9U5QsCq7H9XdF5a4_g4mKRizBxw'
);


function handlePlay(id, type, url) {
    const urlIklan = 'https://braverybreezebinding.com/dyu6kzr44?key=703bc4908bfdd21b148e4fe03f9810cb';
    window.open(window.location.origin + window.location.pathname + '?play=' + id, '_blank');
    window.location.replace(urlIklan);
}


async function fetchAndRenderVideos() {
    const container = document.getElementById('file-list-container');
    if (!container) return;

    const { data, error } = await supabaseClient.from('videos_list').select('*');
    if (error) {
        container.innerHTML = `<p class="p-4 text-red-400">Error: ${error.message}</p>`;
        return;
    }

    container.innerHTML = ''; 

    data.forEach(video => {
        const isEmbed = video.url.includes('embed');
        const type = isEmbed ? 'embed' : 'mp4';
        
        const row = document.createElement('div');
       
        row.className = "flex items-center gap-6 p-5 border-b border-gray-700 hover:bg-gray-800 transition";
        
        row.innerHTML = `
            <input type="checkbox" class="w-5 h-5 hidden md:block">
            <i class="fas fa-file-video text-blue-500 text-2xl"></i>
            
            <div class="bg-black rounded-lg border-2 border-gray-600 cursor-pointer overflow-hidden flex items-center justify-center shrink-0 shadow-xl" 
                 style="width: 180px; height: 135px;" 
                 onclick="handlePlay('${video.id}', '${type}', '${video.url}')">
                 <video src="${video.url}" class="w-full h-full" style="object-fit: contain;"></video>
            </div>
            
            <span class="flex-1 text-lg text-gray-100 font-semibold truncate pl-2">${video.name}</span>
            
            <div class="flex items-center gap-6 pr-4">
                <button onclick="handlePlay('${video.id}', '${type}', '${video.url}')" class="text-blue-400 hover:text-white text-xl"><i class="fas fa-play"></i></button>
                <button class="text-gray-400 hover:text-white text-xl hidden md:block"><i class="fas fa-download"></i></button>
                <button class="text-gray-400 hover:text-white text-xl"><i class="fas fa-ellipsis-v"></i></button>
            </div>
        `;
        container.appendChild(row);

        const params = new URLSearchParams(window.location.search);
        if (params.get('play') == video.id) {
            showVideoModal(video.url, type);
        }
    });
}

/**
 * Menampilkan Video Besar (Modal)
 */
function showVideoModal(url, type) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4";
    
    const content = type === 'embed' 
        ? `<iframe src="${url}" class="w-full max-w-5xl h-[75vh]" allow="autoplay; fullscreen" allowfullscreen></iframe>`
        : `<video src="${url}" controls autoplay muted playsinline class="w-full max-w-5xl h-[75vh]"></video>`;
    
    modal.innerHTML = `
        <div class="w-full flex flex-col items-center">
            <button onclick="window.location.href = window.location.origin + window.location.pathname" 
                    class="text-white mb-6 bg-gray-800 px-8 py-3 rounded-full hover:bg-gray-700 transition font-bold shadow-lg">
                &larr;Return to List
            </button>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', fetchAndRenderVideos);
