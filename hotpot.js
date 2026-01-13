// --- 這裡填入你事先蒐集好的資料 ---
const ingredientsData = [
    { id: 1, name: "小王", msg: "祝芝劭永遠跟肉片一樣鮮嫩多汁！", img: "meat.png" },
    { id: 2, name: "小美", msg: "生日快樂！你是我們這鍋火鍋的靈魂！", img: "ball.png" },
    { id: 3, name: "阿強", msg: "天天開心，工作順利，發大財！", img: "corn.png" },
    // 可以一直加下去...
];

let openedIds = new Set(); // 記錄點過的 ID

// 初始化火鍋
function initPot() {
    const container = document.getElementById('ingredients-container');
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

function openMessage(data) {
    // 顯示內容
    document.getElementById('item-img').src = data.img;
    document.getElementById('item-text').innerText = data.msg;
    document.getElementById('item-author').innerText = "—— " + data.name;
    document.getElementById('msg-modal').style.display = 'block';

    // 標記為已讀
    openedIds.add(data.id);
    document.getElementById(`ing-${data.id}`).classList.add('opened');
    
    updateProgress();
}

function updateProgress() {
    const count = openedIds.size;
    const total = ingredientsData.length;
    document.getElementById('collect-count').innerText = `已品嚐：${count} / ${total}`;
    document.getElementById('progress-fill').style.width = (count / total) * 100 + "%";

    // 檢查是否全部開啟
    if (count === total) {
        setTimeout(showFinalSurprise, 1500);
    }
}

function showFinalSurprise() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    document.getElementById('final-modal').style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

// 已開啟清單查看
document.getElementById('open-list-btn').onclick = () => {
    const listDiv = document.getElementById('collected-list');
    listDiv.innerHTML = "";
    
    ingredientsData.forEach(data => {
        if (openedIds.has(data.id)) {
            const item = document.createElement('p');
            item.style.fontSize = "0.9rem";
            item.style.borderBottom = "1px solid #eee";
            item.style.padding = "5px";
            item.innerHTML = `<strong>${data.name}:</strong> ${data.msg}`;
            listDiv.appendChild(item);
        }
    });
    document.getElementById('list-modal').style.display = 'block';
};

// 修改 openMessage 函式，加入點擊音效
function openMessage(data) {
    // 播放點擊音效
    const popSound = document.getElementById('audio-pop');
    popSound.currentTime = 0; // 重置時間讓連續點擊也有聲音
    popSound.play();

    document.getElementById('item-img').src = data.img;
    document.getElementById('item-text').innerText = data.msg;
    document.getElementById('item-author').innerText = "—— " + data.name;
    document.getElementById('msg-modal').style.display = 'block';

    openedIds.add(data.id);
    document.getElementById(`ing-${data.id}`).classList.add('opened');
    updateProgress();
}

// 新增啟動 App 函式
function startApp() {
    // 播放開場音樂
    const introAudio = document.getElementById('audio-intro');
    introAudio.play().catch(e => console.log("音樂播放受阻:", e));

    // 關閉遮罩
    document.getElementById('start-overlay').style.display = 'none';

    // 初始化火鍋
    initPot();
}