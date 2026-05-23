const API_URL = 'http://34.101.165.131:3000/notes';

// Ambil dan tampilkan catatan
async function fetchNotes() {
    const response = await fetch(API_URL);
    const notes = await response.json();
    const list = document.getElementById('notes-list');
    list.innerHTML = '';
    
    notes.forEach(note => {
        list.innerHTML += `
            <div class="note-card">
                <h3>${note.judul}</h3>
                <p>${note.isi}</p>
                <small>Dibuat: ${new Date(note.createdAt).toLocaleString()}</small>
                <div class="note-actions">
                    <button class="btn-edit" onclick="editNote(${note.id}, \`${note.judul.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`, \`${note.isi.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`)">Edit</button>
                    <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `;
    });
}

// Tambah atau Update catatan
async function saveNote() {
    const id = document.getElementById('note-id').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi })
    });

    // Reset form
    document.getElementById('note-id').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    
    fetchNotes();
}

// Set data ke form untuk diedit
function editNote(id, judul, isi) {
    document.getElementById('note-id').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
}

// Hapus catatan
async function deleteNote(id) {
    if(confirm('Yakin ingin menghapus?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    }
}

// Panggil saat halaman diload
fetchNotes();
