// Sample data for demonstration
const sampleData = {
    devices: 42,
    energy: 1560,
    users: 15,
    alerts: 8,
    energyData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [120, 190, 130, 170, 160, 180, 150, 200, 190, 220, 210, 230]
    },
    deviceStatus: {
        labels: ['Online', 'Offline', 'Maintenance'],
        values: [30, 8, 4]
    },
    deviceUsage: {
        labels: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'],
        values: [120, 90, 150, 110, 130]
    },
    alertsDistribution: {
        labels: ['Critical', 'Warning', 'Error', 'Info'],
        values: [5, 3, 7, 2]
    },
    alerts: [
        { time: '10:30 AM', device: 'Device A', type: 'High Temperature', status: 'Critical' },
        { time: '09:45 AM', device: 'Device B', type: 'Low Battery', status: 'Warning' },
        { time: '09:15 AM', device: 'Device C', type: 'Connection Lost', status: 'Error' },
        { time: '08:30 AM', device: 'Device D', type: 'Overload', status: 'Critical' }
    ],
    notifications: [
        { id: 1, message: 'New device connected', time: '2 minutes ago', read: false },
        { id: 2, message: 'High energy consumption alert', time: '15 minutes ago', read: false },
        { id: 3, message: 'System update completed', time: '1 hour ago', read: true }
    ]
};

// Theme Switching
function initThemeSwitch() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    // Handle theme toggle
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update chart colors based on theme
        updateChartColors(newTheme);
    });
}

// Update chart colors based on theme
function updateChartColors(theme) {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#f1f5f9' : '#1e293b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Update all charts
    Chart.helpers.each(Chart.instances, (instance) => {
        const chart = instance.chart;
        const options = chart.options;
        
        // Update text colors
        options.scales.x.ticks.color = textColor;
        options.scales.y.ticks.color = textColor;
        
        // Update grid colors
        options.scales.x.grid.color = gridColor;
        options.scales.y.grid.color = gridColor;
        
        // Update legend colors
        if (options.plugins.legend) {
            options.plugins.legend.labels.color = textColor;
        }
        
        chart.update();
    });
}

// Initialize Sidebar Toggle
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    let isCollapsed = false;

    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('collapsed', isCollapsed);
        mainContent.classList.toggle('expanded', isCollapsed);
        
        const icon = sidebarToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isCollapsed);
        icon.classList.toggle('fa-times', isCollapsed);
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarCollapse.addEventListener('click', toggleSidebar);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                isCollapsed = false;
            }
        }, 250);
    });
}

// Initialize Notifications
function initNotifications() {
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationBadge = notificationsDropdown.querySelector('.badge');
    
    // Update notification badge
    function updateNotificationBadge() {
        const unreadCount = sampleData.notifications.filter(n => !n.read).length;
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    // Mark notification as read
    function markAsRead(notificationId) {
        const notification = sampleData.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            updateNotificationBadge();
        }
    }

    // Handle notification click
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', () => {
            const notificationId = parseInt(item.dataset.id);
            markAsRead(notificationId);
            item.classList.remove('unread');
        });
    });

    updateNotificationBadge();
}

// Update Stats Cards with animation
function updateStats() {
    const stats = {
        devices: document.getElementById('totalDevices'),
        energy: document.getElementById('energyConsumption'),
        users: document.getElementById('activeUsers'),
        alerts: document.getElementById('totalAlerts')
    };

    // Animate value changes
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = element.id === 'energyConsumption' ? `${value} kWh` : value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateValue(stats.devices, parseInt(stats.devices.textContent), sampleData.devices, 500);
    animateValue(stats.energy, parseInt(stats.energy.textContent), sampleData.energy, 500);
    animateValue(stats.users, parseInt(stats.users.textContent), sampleData.users, 500);
    animateValue(stats.alerts, parseInt(stats.alerts.textContent), sampleData.alerts, 500);
}

// Initialize Energy Consumption Chart
function initEnergyChart() {
    const ctx = document.getElementById('energyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sampleData.energyData.labels,
            datasets: [{
                label: 'Energy Consumption (kWh)',
                data: sampleData.energyData.values,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: '#4f46e5',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#4f46e5',
                pointHoverBorderColor: '#4f46e5',
                pointHitRadius: 10,
                pointBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize Device Status Chart
function initDeviceStatusChart() {
    const ctx = document.getElementById('deviceStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sampleData.deviceStatus.labels,
            datasets: [{
                data: sampleData.deviceStatus.values,
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                hoverBackgroundColor: ['#059669', '#dc2626', '#d97706'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            },
            cutout: '80%'
        }
    });
}

// Initialize Device Usage Chart
function initDeviceUsageChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.deviceUsage.labels,
            datasets: [{
                label: 'Usage (kWh)',
                data: sampleData.deviceUsage.values,
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            }
        }
    });
}

// Initialize Alerts Distribution Chart
function initAlertsDistributionChart() {
    const ctx = document.getElementById('columnChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.alertsDistribution.labels,
            datasets: [{
                label: 'Number of Alerts',
                data: sampleData.alertsDistribution.values,
                backgroundColor: [
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(245, 158, 11, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(59, 130, 246, 0.6)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            }
        }
    });
}

// Update Alerts Table
function updateAlertsTable() {
    const tbody = document.getElementById('alertsTableBody');
    tbody.innerHTML = '';
    
    sampleData.alerts.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alert.time}</td>
            <td>${alert.device}</td>
            <td>${alert.type}</td>
            <td><span class="badge bg-${getStatusColor(alert.status)}">${alert.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Helper function to get status color
function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'critical':
            return 'danger';
        case 'warning':
            return 'warning';
        case 'error':
            return 'danger';
        default:
            return 'secondary';
    }
}

// Initialize Language Selection
function initLanguageSelection() {
    const languageDropdown = document.getElementById('languageDropdown');
    const flagIcon = languageDropdown.querySelector('img');
    
    // Handle language change
    document.querySelectorAll('#languageDropdown + .dropdown-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const newFlag = item.querySelector('img').src;
            flagIcon.src = newFlag;
        });
    });
}

// Initialize dashboard
function initDashboard() {
    initThemeSwitch();
    initSidebarToggle();
    initNotifications();
    initLanguageSelection();
    updateStats();
    initEnergyChart();
    initDeviceStatusChart();
    initDeviceUsageChart();
    initAlertsDistributionChart();
    updateAlertsTable();
}

// Add event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Simulate real-time updates (every 5 seconds)
setInterval(() => {
    // Update sample data with random variations
    sampleData.devices = Math.max(30, Math.min(50, sampleData.devices + Math.floor(Math.random() * 3) - 1));
    sampleData.energy = Math.max(1000, Math.min(2000, sampleData.energy + Math.floor(Math.random() * 100) - 50));
    sampleData.users = Math.max(10, Math.min(20, sampleData.users + Math.floor(Math.random() * 3) - 1));
    sampleData.alerts = Math.max(0, Math.min(10, sampleData.alerts + Math.floor(Math.random() * 3) - 1));
    
    // Update the dashboard
    updateStats();
}, 5000); 