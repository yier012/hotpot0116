// --- 這裡填入你事先蒐集好的資料 ---
const ingredientsData = [
    { id: 1, name: "小王", msg: "祝芝劭永遠跟肉片一樣鮮嫩多汁！", img: "shrimp.png" },
    { id: 2, name: "小美", msg: "生日快樂！你是我們這鍋火鍋的靈魂！", img: "shrimp.png" },
    { id: 3, name: "阿強", msg: "天天開心，工作順利，發大財！", img: "shrimp.png" },
    // 你可以繼續往下加
];

let openedIds = new Set(); // 記錄點過的 ID

// 初始化火鍋
function initPot() {
    const container = document.getElementById('ingredients-container');
    // 防止重複執行
    container.innerHTML = "";
    document.getElementById('collect-count').innerText = `已品嚐：0 / ${ingredientsData.length}`;

    ingredientsData.forEach(data => {
        const img = document.createElement('img');
        img.src = data.img;
        img.className = 'ing-item';
        img.id = `ing-${data.id}`;
        
        // 隨機初始位置
        img.style.left = Math.random() * 70 + 10 + "%";
        img.style.top = Math.random() * 70 + 10 + "%";
        
        img.onclick = () => openMessage(data);
        container.appendChild(img);
    });
}

// 點擊火鍋料的函式 (已合併所有功能)
function openMessage(data) {
    // 1. 播放點擊音效
    const popSound = document.getElementById('audio-pop');
    if (popSound) {
        popSound.currentTime = 0; // 重置時間讓連續點擊也有聲音
        popSound.play();
    }

    // 2. 顯示祝福內容
    document.getElementById('item-img').src = data.img;
    document.getElementById('item-text').innerText = data.msg;
    document.getElementById('item-author').innerText = "—— " + data.name;
    document.getElementById('msg-modal').style.display = 'block';

    // 3. 關鍵修改：讓點過的火鍋料立刻消失！
    const currentItem = document.getElementById(`ing-${data.id}`);
    if (currentItem) {
        currentItem.style.display = 'none'; 
    }

    // 4. 記錄已讀並更新進度
    openedIds.add(data.id);
    updateProgress();
}

function updateProgress() {
    const count = openedIds.size;
    const total = ingredientsData.length;
    document.getElementById('collect-count').innerText = `已品嚐：${count} / ${total}`;
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = (count / total) * 100 + "%";
    }
}

function closeModal() {
    document.getElementById('msg-modal').style.display = 'none';
    
    // 如果點完最後一個了，關掉訊息後立刻噴彩帶出驚喜
    if (openedIds.size === ingredientsData.length) {
        showFinalSurprise();
    }
}

function showFinalSurprise() {
    confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 } 
    });
    document.getElementById('final-modal').style.display = 'block';
}

// 新增啟動 App 函式
function startApp() {
    // 播放開場音樂
    const introAudio = document.getElementById('audio-intro');
    if (introAudio) {
        introAudio.play().catch(e => console.log("音樂播放受阻:", e));
    }

    // 關閉遮罩
    document.getElementById('start-overlay').style.display = 'none';

    // 初始化火鍋
    initPot();
}