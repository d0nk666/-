const startButton = document.getElementById('start-button');
        const restartButton = document.getElementById('restart-button');
        
        
        let score = 0;
        let timeLeft = 60;
        let gameInterval;
        let timerInterval;
        let rabbits = [];
        
        
        const gameWidth = gameContainer.offsetWidth;
        const gameHeight = gameContainer.offsetHeight;
        
       
        function startGame() {
            score = 0;
            timeLeft = 60;
            scoreDisplay.textContent = "Поймано:" + score;
            timerDisplay.textContent = "Время:" + timeLeft;
            
            
            rabbits.forEach(rabbit => rabbit.remove());
            rabbits = [];
            
            
            startScreen.style.display = 'none';
            gameOverScreen.style.display = 'none';
            
            
            gameInterval = setInterval(createRabbit, 1000);
            
           
            timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = "Время:" + timeLeft;
                
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }
        
        
        function createRabbit() {
            const rabbit = document.createElement('div');
            rabbit.className = 'rabbit';
            
            
            const x = Math.random() * (gameWidth - 60);
            const y = Math.random() * (gameHeight - 60);
            
            rabbit.style.left = x + "px";
            rabbit.style.top = y + "px";
            
           
            rabbit.addEventListener('click', () => {
                score++;
                scoreDisplay.textContent = "Поймано:" + score;
                rabbit.remove();
                rabbits = rabbits.filter(r => r !== rabbit);
                
                
                rabbit.style.transform = 'scale(0)';
                setTimeout(() => rabbit.remove(), 100);
            });
            
            gameContainer.appendChild(rabbit);
            rabbits.push(rabbit);
            
           
            setTimeout(() => {
                if (rabbits.includes(rabbit)) {
                    rabbit.remove();
                    rabbits = rabbits.filter(r => r !== rabbit);
                }
            }, 3000);
        }
        
       
        function endGame() {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            
            
            rabbits.forEach(rabbit => rabbit.remove());
            rabbits = [];
            
           
            finalScoreDisplay.textContent = "Вы поймали" + score + "кроликов";
            gameOverScreen.style.display = 'flex';
        }
        
        
        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', startGame);
        
        
        gameContainer.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const clickEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                document.elementFromPoint(touch.clientX, touch.clientY).dispatchEvent(clickEvent);
            }
        }, { passive: false });
