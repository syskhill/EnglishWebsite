// Main JavaScript for Connor's Academic Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Theme switcher functionality
  setupThemeSwitcher();
  
  // Reading progress bar
  setupProgressBar();
  
  // Back to top button
  setupBackToTop();
  
  // Add animation to cards
  animateCards();
  
  // Add estimated reading time to posts
  addReadingTime();
});

// Theme switching
function setupThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  // Mark the current theme button as active
  themeButtons.forEach(button => {
    if (button.getAttribute('data-theme') === storedTheme) {
      button.classList.add('active');
    }
    
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Update active state
      themeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Reading progress bar
function setupProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const windowScroll = document.documentElement.scrollTop;
    const scrolled = (windowScroll / windowHeight) * 100;
    
    progressBar.style.width = scrolled + '%';
  });
}

// Back to top button
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Animate cards on scroll
function animateCards() {
  const cards = document.querySelectorAll('.card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    cards.forEach(card => {
      observer.observe(card);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    cards.forEach(card => {
      card.classList.add('animated');
    });
  }
}

// Add estimated reading time to posts
function addReadingTime() {
  const postContent = document.querySelector('.post-content');
  const readingTimeElement = document.querySelector('.reading-time');
  
  if (postContent && readingTimeElement) {
    // Average reading speed (words per minute)
    const wordsPerMinute = 200;
    
    // Count words in the post content
    const text = postContent.textContent || postContent.innerText;
    const wordCount = text.trim().split(/\s+/).length;
    
    // Calculate reading time
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Update the reading time element
    readingTimeElement.textContent = `${readingTime} min read`;
  }
}

// Function to create a table of contents for posts
function createTableOfContents() {
  const postContent = document.querySelector('.post-content');
  const tocContainer = document.querySelector('.table-of-contents');
  
  if (postContent && tocContainer) {
    const headings = postContent.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
      const toc = document.createElement('ul');
      
      headings.forEach((heading, index) => {
        // Add ID to the heading if it doesn't have one
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        // Add class based on heading level
        if (heading.tagName === 'H3') {
          listItem.classList.add('toc-sub-item');
        }
        
        listItem.appendChild(link);
        toc.appendChild(listItem);
      });
      
      tocContainer.appendChild(toc);
    }
  }
}

// Initialize table of contents on post pages
if (document.querySelector('.post-content')) {
  createTableOfContents();
}