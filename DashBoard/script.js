const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });


document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out successfully!');
    }
});