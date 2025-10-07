document.addEventListener('DOMContentLoaded', () => {
    const userListBody = document.getElementById('userListBody');
    const userTable = document.getElementById('userTable');
    const noUsersMessage = document.getElementById('noUsersMessage');

    function loadUsers() {
        // 1. Get user data from Local Storage
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // 2. Check if the list is empty
        if (users.length === 0) {
            userTable.classList.add('hidden');
            noUsersMessage.classList.remove('hidden');
            return;
        }

        userTable.classList.remove('hidden');
        noUsersMessage.classList.add('hidden');
        userListBody.innerHTML = ''; // Clear any existing rows

        // 3. Iterate over the user list and create table rows
        users.forEach(user => {
            const row = userListBody.insertRow();
            
            // ID Cell (with a subtle animation for visibility)
            const idCell = row.insertCell();
            idCell.textContent = user.id;
            idCell.classList.add('id-cell'); 

            // Name Cell
            const nameCell = row.insertCell();
            nameCell.textContent = user.fullName;

            // Email Cell
            const emailCell = row.insertCell();
            emailCell.textContent = user.email;
        });
    }

    loadUsers();
});