document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Handle Upload Form with visual feedback
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('video-file');
        
        // Drag and drop effects
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.add('drag-active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('drag-active');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            fileInput.files = files;
            updateFileName(files[0]?.name);
        });

        fileInput.addEventListener('change', function(e) {
            updateFileName(e.target.files[0]?.name);
        });

        function updateFileName(name) {
            if(name) {
                const uploadText = dropzone.querySelector('p.text-gray-400');
                if(uploadText) {
                    uploadText.innerHTML = `<span class="text-brand-500 font-semibold">${name}</span> selected`;
                }
            }
        }

        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Uploading...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate upload delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Upload Successful!';
                submitBtn.classList.remove('from-brand-600', 'to-purple-600');
                submitBtn.classList.add('bg-green-600', 'from-green-600', 'to-green-500');
                
                showToast("Video uploaded successfully to Minoz Gallery!");
                
                setTimeout(() => {
                    uploadForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600', 'from-green-600', 'to-green-500');
                    submitBtn.classList.add('from-brand-600', 'to-purple-600');
                    const uploadText = dropzone.querySelector('p.text-gray-400');
                    if(uploadText) {
                        uploadText.innerHTML = 'Drag and drop your video here, or <span class="text-brand-500 cursor-pointer">browse</span>';
                    }
                }, 3000);
            }, 2500);
        });
    }

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 20) {
            nav.classList.add('shadow-lg', 'bg-dark-950/90');
        } else {
            nav.classList.remove('shadow-lg', 'bg-dark-950/90');
        }
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 glass border-l-4 border-brand-500 rounded px-6 py-4 shadow-2xl z-50 animate-fade-in flex items-center gap-3 text-white';
    toast.innerHTML = `<div class="bg-brand-500/20 text-brand-500 rounded-full w-8 h-8 flex items-center justify-center shrink-0"><i class="fas fa-check"></i></div> <div><p class="font-bold text-sm">Success</p><p class="text-xs text-gray-300 mt-1">${message}</p></div>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
