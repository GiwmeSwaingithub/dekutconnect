<!-- Add this where you want the Instagram stats to appear -->
<div class="ig-stats" data-username="dekutconnect">
    <div class="ig-header">
        <div class="ig-logo"><i class="fab fa-instagram"></i></div>
        <h3 class="ig-title">Instagram Stats</h3>
    </div>
    <div class="ig-content">
        <div class="ig-loading">
            <div class="ig-spinner"></div>
            <p>Loading...</p>
        </div>
    </div>
    <div class="ig-footer">
        <a href="#" class="ig-link" target="_blank">View Profile</a>
    </div>
</div>

<!-- Add the CSS in your <head> section -->
<style>
.ig-stats {
    font-family: 'Segoe UI', Roboto, sans-serif;
    max-width: 300px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin: 10px auto;
}
.ig-header {
    background: linear-gradient(45deg, #405DE6, #833AB4, #E1306C);
    padding: 12px 15px;
    display: flex;
    align-items: center;
    color: white;
}
.ig-logo { font-size: 1.2rem; margin-right: 8px; }
.ig-title { font-size: 0.9rem; font-weight: 600; margin: 0; }
.ig-content { padding: 15px; }
.ig-username { 
    font-size: 1.1rem; 
    font-weight: 600; 
    margin-bottom: 12px; 
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ig-verified { color: #405DE6; margin-left: 4px; font-size: 0.8rem; }
.ig-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 8px; 
}
.ig-stat { 
    text-align: center; 
    padding: 10px 5px; 
    border-radius: 8px; 
    background: rgba(64, 93, 230, 0.05);
}
.ig-value { font-size: 1rem; font-weight: 700; margin-bottom: 2px; }
.ig-label { font-size: 0.7rem; color: #8e8e8e; text-transform: uppercase; }
.ig-footer { 
    padding: 12px 15px; 
    text-align: center; 
    background: #f8f9fa; 
    border-top: 1px solid #dbdbdb; 
}
.ig-link { 
    display: inline-block; 
    background: linear-gradient(45deg, #405DE6, #833AB4, #E1306C);
    color: white; 
    text-decoration: none; 
    padding: 6px 16px; 
    border-radius: 16px; 
    font-weight: 600; 
    font-size: 0.75rem; 
}
.ig-loading { text-align: center; padding: 20px; color: #8e8e8e; }
.ig-spinner { 
    border: 2px solid rgba(0,0,0,0.1); 
    border-left-color: #405DE6; 
    border-radius: 50%; 
    width: 20px; 
    height: 20px; 
    animation: spin 1s linear infinite; 
    margin: 0 auto 8px; 
}
@keyframes spin { to { transform: rotate(360deg); } }
.ig-error { 
    text-align: center; 
    padding: 15px; 
    color: #E1306C; 
    background: rgba(225, 48, 108, 0.1); 
    border-radius: 6px; 
    font-size: 0.8rem; 
}
</style>

<!-- Add the JavaScript before closing </body> tag -->
<script>
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
</script>
