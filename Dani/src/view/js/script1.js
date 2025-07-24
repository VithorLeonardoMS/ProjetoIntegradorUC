class ProfileManager {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadProfile();
    }

    initializeElements() {
        this.profileImage = document.getElementById('profileImage');
        this.imageUpload = document.getElementById('imageUpload');
        this.uploadProgress = document.getElementById('uploadProgress');
        this.notification = document.getElementById('notification');
        this.saveBtn = document.getElementById('saveProfile');
        this.editBtn = document.getElementById('editProfile');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
        this.notificationText = document.querySelector('.notification-text');

        // Verificar se todos os elementos foram encontrados
        const elements = {
            profileImage: this.profileImage,
            imageUpload: this.imageUpload,
            uploadProgress: this.uploadProgress,
            notification: this.notification,
            saveBtn: this.saveBtn,
            editBtn: this.editBtn,
            progressFill: this.progressFill,
            progressText: this.progressText,
            notificationText: this.notificationText
        };

        for (const [name, element] of Object.entries(elements)) {
            if (!element) {
                console.error(`Elemento não encontrado: ${name}`);
            } else {
                console.log(`Elemento encontrado: ${name}`);
            }
        }
    }

    bindEvents() {
        // Upload de imagem
        if (this.profileImage) {
            this.profileImage.addEventListener('click', () => {
                this.imageUpload.click();
            });
        }

        const uploadOverlay = document.querySelector('.upload-overlay');
        if (uploadOverlay) {
            uploadOverlay.addEventListener('click', () => {
                this.imageUpload.click();
            });
        }

        if (this.imageUpload) {
            this.imageUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e);
            });
        }

        // Botões de ação
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => {
                console.log('Botão Salvar clicado');
                this.saveProfile();
            });
        } else {
            console.error('Botão Salvar não encontrado');
        }

        if (this.editBtn) {
            this.editBtn.addEventListener('click', () => {
                console.log('Botão Editar clicado');
                this.toggleEditMode();
            });
            console.log('Event listener adicionado ao botão Editar');
        } else {
            console.error('Botão Editar não encontrado');
        }

        // Auto-save em campos editáveis
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            element.addEventListener('blur', () => {
                this.autoSave();
            });
        });

        // Drag and drop para imagem
        this.profileImage.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.profileImage.style.opacity = '0.7';
        });

        this.profileImage.addEventListener('dragleave', () => {
            this.profileImage.style.opacity = '1';
        });

        this.profileImage.addEventListener('drop', (e) => {
            e.preventDefault();
            this.profileImage.style.opacity = '1';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.uploadImage(files[0]);
            }
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.uploadImage(file);
        }
    }

    async uploadImage(file) {
        // Validação do arquivo
        if (!this.validateImage(file)) {
            return;
        }

        // Preview da imagem
        this.previewImage(file);

        // Upload para o servidor
        await this.uploadToServer(file);
    }

    validateImage(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            this.showNotification('Formato de arquivo não suportado. Use JPG, PNG ou GIF.', 'error');
            return false;
        }

        if (file.size > maxSize) {
            this.showNotification('Arquivo muito grande. Máximo 5MB.', 'error');
            return false;
        }

        return true;
    }

    previewImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async uploadToServer(file) {
        const formData = new FormData();
        formData.append('profileImage', file);

        // Mostrar progresso
        this.showUploadProgress();

        try {
            const response = await fetch('/api/upload-profile-image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                this.hideUploadProgress();
                this.showNotification('Foto de perfil atualizada com sucesso!', 'success');
                
                // Atualizar a imagem com a URL do servidor
                if (result.imageUrl) {
                    this.profileImage.src = result.imageUrl;
                }
            } else {
                throw new Error('Erro no upload');
            }
        } catch (error) {
            this.hideUploadProgress();
            this.showNotification('Erro ao fazer upload da imagem. Tente novamente.', 'error');
            console.error('Upload error:', error);
        }
    }

    showUploadProgress() {
        this.uploadProgress.classList.remove('hidden');
        this.animateProgress();
    }

    hideUploadProgress() {
        this.uploadProgress.classList.add('hidden');
        this.progressFill.style.width = '0%';
    }

    animateProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 90) {
                progress = 90;
                clearInterval(interval);
            }
            this.progressFill.style.width = progress + '%';
        }, 200);
    }

    async saveProfile() {
        const profileData = this.getProfileData();
        
        try {
            const response = await fetch('/api/save-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (response.ok) {
                this.showNotification('Perfil salvo com sucesso!', 'success');
                localStorage.setItem('profileData', JSON.stringify(profileData));
            } else {
                throw new Error('Erro ao salvar perfil');
            }
        } catch (error) {
            this.showNotification('Erro ao salvar perfil. Tente novamente.', 'error');
            console.error('Save error:', error);
        }
    }

    getProfileData() {
        return {
            name: document.querySelector('.profile-name').textContent,
            title: document.querySelector('.profile-title').textContent,
            bio: document.querySelector('.bio').textContent,
            email: document.querySelector('.contact-item:nth-child(1) span').textContent,
            phone: document.querySelector('.contact-item:nth-child(2) span').textContent,
            location: document.querySelector('.contact-item:nth-child(3) span').textContent,
            skills: Array.from(document.querySelectorAll('.skill-tag')).map(tag => tag.textContent),
            imageUrl: this.profileImage.src
        };
    }

    loadProfile() {
        const savedProfile = localStorage.getItem('profileData');
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            this.populateProfile(profileData);
        }
    }

    populateProfile(data) {
        if (data.name) document.querySelector('.profile-name').textContent = data.name;
        if (data.title) document.querySelector('.profile-title').textContent = data.title;
        if (data.bio) document.querySelector('.bio').textContent = data.bio;
        if (data.email) document.querySelector('.contact-item:nth-child(1) span').textContent = data.email;
        if (data.phone) document.querySelector('.contact-item:nth-child(2) span').textContent = data.phone;
        if (data.location) document.querySelector('.contact-item:nth-child(3) span').textContent = data.location;
        if (data.imageUrl && data.imageUrl !== this.profileImage.src) {
            this.profileImage.src = data.imageUrl;
        }
    }

    autoSave() {
        const profileData = this.getProfileData();
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }

    toggleEditMode() {
        console.log('toggleEditMode chamado');
        
        const editableElements = document.querySelectorAll('[contenteditable]');
        console.log('Elementos editáveis encontrados:', editableElements.length);
        
        if (editableElements.length === 0) {
            console.error('Nenhum elemento editável encontrado');
            return;
        }
        
        const isCurrentlyEditing = editableElements[0].getAttribute('contenteditable') === 'true';
        console.log('Estado atual de edição:', isCurrentlyEditing);
        
        editableElements.forEach((element, index) => {
            const newState = isCurrentlyEditing ? 'false' : 'true';
            element.setAttribute('contenteditable', newState);
            element.style.backgroundColor = isCurrentlyEditing ? 'transparent' : 'rgba(79, 70, 229, 0.05)';
            element.style.border = isCurrentlyEditing ? 'none' : '1px dashed rgba(79, 70, 229, 0.3)';
            element.style.borderRadius = isCurrentlyEditing ? '0' : '4px';
            element.style.padding = isCurrentlyEditing ? '0' : '5px';
            console.log(`Elemento ${index}: contenteditable = ${newState}`);
        });

        // Atualizar texto e ícone do botão
        if (isCurrentlyEditing) {
            this.editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar';
            this.showNotification('Modo de edição desativado', 'success');
            console.log('Modo de edição desativado');
        } else {
            this.editBtn.innerHTML = '<i class="fas fa-save"></i> Finalizar Edição';
            this.showNotification('Modo de edição ativado - clique nos campos para editar', 'success');
            console.log('Modo de edição ativado');
        }
    }

    showNotification(message, type = 'success') {
        this.notificationText.textContent = message;
        this.notification.className = `notification ${type}`;
        this.notification.classList.remove('hidden');

        // Mudar cor baseada no tipo
        if (type === 'error') {
            this.notification.style.background = '#e53e3e';
        } else {
            this.notification.style.background = '#48bb78';
        }

        // Auto-hide após 3 segundos
        setTimeout(() => {
            this.notification.classList.add('hidden');
        }, 3000);
    }

    // Método para integração com página inicial
    getProfileForIntegration() {
        return {
            element: document.querySelector('.profile-card'),
            data: this.getProfileData(),
            methods: {
                show: () => this.show(),
                hide: () => this.hide(),
                updateProfile: (data) => this.populateProfile(data)
            }
        };
    }

    show() {
        document.querySelector('.profile-container').style.display = 'flex';
    }

    hide() {
        document.querySelector('.profile-container').style.display = 'none';
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.profileManager = new ProfileManager();
});

// Exportar para uso em outras páginas
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileManager;
}

