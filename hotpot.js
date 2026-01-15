// --- 這裡填入你事先蒐集好的資料 ---
const ingredientsData = [
    { id: 1, name: "？？？", msg: "祝芝劭永遠跟肉片一樣鮮嫩多汁！", img: "meat.png" },
    { id: 2, name: "？？？", msg: "好蝦喔", img: "shrimp.png" },
    { id: 3, name: "小屌偉", msg: "兒子生日快樂嗚嗚嗚為什麼是母雞帶小雞，因為迪是團媽啦🔥（然後這張圖有亮點啊這爸）", img: "david.png"},
    { id: 4, name: "？？？", msg: "媽的貢丸", img: "ball.webp" },
    { id: 5, name: "Jay Chou", msg: "祝兒子生日快樂，未來一切順利，畫小雞的人是小屌", img: "jay.png" },
    { id: 6, name: "波波子", msg: "兒子生日快樂啊～小屌團的爸爸請小屌吃糰子", img: "bobo.png" },
    { id: 7, name: "罡罡", msg: "嗚嗚嗚", img: "gang.png" },
    { id: 8, name: "012大屌工程師", msg: "祝我的美女兒23歲生日快樂 愛愛", img: "orange.png" },
    { id: 9, name: "？？？", msg: "菜就多練", img: "vegetable.png" },
    { id: 10, name: "？？？", msg: "蛤", img: "huh.png" },

    // 你可以繼續往下加
];

let openedIds = new Set(); // 記錄點過的 ID

// 初始化火鍋
function initPot() {
    const container = document.getElementById('ingredients-container');
    container.innerHTML = "";
    
    ingredientsData.forEach(data => {
        const img = document.createElement('img');
        img.src = data.img;
        img.className = 'ing-item';
        img.id = `ing-${data.id}`;
        
        // --- 修改這裡：如果資料裡有寫 scale，就把它放大 ---
        if (data.scale) {
            img.style.width = (80 * data.scale) + "px"; // 比如 80 * 1.5 = 120px
        }
        
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

function changeSoup(type) {
    const soup = document.querySelector('.soup');
    let newBg = "";

    switch(type) {
        case 'spicy':
            newBg = "radial-gradient(circle, #ff9e91 0%, #ff5e62 100%)";
            break;
        case 'milk':
            newBg = "radial-gradient(circle, #ffffff 0%, #faf0de 100%)";
            break;
        case 'orange':
            newBg = "radial-gradient(circle, #ffcc80 0%, #eb9f3d 100%)";
            break;
    }

    // 變更背景
    soup.style.background = newBg;
    
    // 順便播一下點擊音效
    const popSound = document.getElementById('audio-soup');
    if (popSound) {
        popSound.currentTime = 0;
        popSound.play();
    }
}