        // Firebase راه‌اندازی اولیه
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const chatRef = db.ref('morg-doni/chat');
        const gameStateRef = db.ref('morg-doni/gameState');

        let isPlayer1 = true; // این باید به صورت پویا تعیین شود

        // توابع UI (برای نمایش کارت‌ها، وضعیت و ...)
        function renderHand(hand) {
            // ... کدی برای نمایش کارت‌های بازیکن ...
        }

        function updateStatus(status) {
            // ... کدی برای نمایش وضعیت بازی ...
        }

        // توابع مربوط به Firebase
        function sendMessage(message) {
            if (isPlayer1) {
                chatRef.push({ player: 'player1', text: message, timestamp: Date.now() });
            } else {
                chatRef.push({ player: 'player2', text: message, timestamp: Date.now() });
            }
        }

        chatRef.on('child_added', (snapshot) => {
            const messageData = snapshot.val();
            // ... کدی برای نمایش پیام چت در UI ...
            console.log(`[${messageData.player}]: ${messageData.text}`);
        });

        function sendGameState(newState) {
            gameStateRef.set(newState);
        }

        gameStateRef.on('value', (snapshot) => {
            const gameState = snapshot.val();
            if (gameState) {
                updateStatus(gameState.status);
                if (gameState.currentPlayer === 'player1' && isPlayer1) {
                    // نوبت بازیکن ۱ است
                } else if (gameState.currentPlayer === 'player2' && !isPlayer1) {
                    // نوبت بازیکن ۲ است
                }
                // ... به‌روزرسانی سایر بخش‌های UI بر اساس وضعیت بازی ...
            }
        });

        // ... سایر توابع و منطق بازی ...

        // اجرای اولیه
        function initializeGame() {
            // تنظیم isPlayer1 (مثلاً با خواندن از پارامتر URL یا روش دیگر)
            // ارسال وضعیت اولیه بازی به Firebase
            sendGameState({
                currentPlayer: 'player1',
                player1Hand: [], // کارت‌های اولیه بازیکن ۱
                player2Hand: [], // کارت‌های اولیه بازیکن ۲
                playedCards: [],
                status: 'شروع بازی'
            });
        }
        initializeGame();
