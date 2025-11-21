
document.addEventListener('DOMContentLoaded', function() {
    const snippets = document.querySelectorAll('.ig-stats');
                      const config = {
                apiUrls: [
                    'https://ig-analytics-vercel.vercel.app/api/profile?username=',
                    'https://instascrapper-mocha.vercel.app/api/profile?username='
                ],
            };
    snippets.forEach(snippet => {
        const username = snippet.dataset.username;
        if (username) {
            fetch(Apiurl${username}`)
                .then(response => response.ok ? response.json() : Promise.reject())
                .then(data => {
                    const content = snippet.querySelector('.ig-content');
                    const loading = content.querySelector('.ig-loading');
                    const profile = data.profile;
                    
                    const statsHTML = `
                        <div class="ig-username">
                            @${profile.username}
                            ${profile.is_verified ? '<span class="ig-verified"><i class="fas fa-check-circle"></i></span>' : ''}
                        </div>
                        <div class="ig-grid">
                            <div class="ig-stat">
                                <div class="ig-value">${formatNumber(profile.posts_count)}</div>
                                <div class="ig-label">Posts</div>
                            </div>
                            <div class="ig-stat">
                                <div class="ig-value">${formatNumber(profile.followers)}</div>
                                <div class="ig-label">Followers</div>
                            </div>
                            <div class="ig-stat">
                                <div class="ig-value">${formatNumber(profile.following)}</div>
                                <div class="ig-label">Following</div>
                            </div>
                        </div>
                    `;
                    
                    loading.style.display = 'none';
                    content.innerHTML = statsHTML;
                    
                    const link = snippet.querySelector('.ig-link');
                    link.href = `https://instagram.com/${profile.username}`;
                })
                .catch(error => {
                    const content = snippet.querySelector('.ig-content');
                    const loading = content.querySelector('.ig-loading');
                    loading.style.display = 'none';
                    content.innerHTML = '<div class="ig-error"><p>Failed to load stats</p></div>';
                });
        }
    });
    
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
});

