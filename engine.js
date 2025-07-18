var jellyfish;
var blackJellyfish;
var gameTimer;
var output;
var numHits = 0;
var miss = 0;
var txtEndTitle;
var txtEndMessage;

// HTMLの読み込み完了後に実行されるようにする
window.onload = function() {
    init();
};

function init() {
    txtEndTitle = document.getElementById('txtEndTitle');
    txtEndMessage = document.getElementById('txtEndMessage');
    jellyfish = document.getElementById('jellyfish');
    blackJellyfish = document.getElementById('blackJellyfish');
    output = document.getElementById('output');
    document.getElementById('endScreen').style.display = 'none';
    

    // HTML側でonclick属性を設定することを推奨
    // jellyfish.onclick = hitJellyfish;
    // blackJellyfish.onclick = hitBlackJellyfish;
    
    // ゲーム開始前の初期位置設定
    placeJellyfish();
    placeBlackJellyfish();
}

function startGame() {
    document.getElementById('introScreen').style.display = 'none';
    // ゲーム開始時にスコアをリセット
    numHits = 0;
    miss = 0;
    updateScore(); // スコア表示を初期化
    gameTimer = setInterval(gameloop, 30);
}

function replay() {
    location.reload();
}

// 通常のクラゲを配置する関数
function placeJellyfish() {
    var x = Math.floor(Math.random() * 421);
    jellyfish.style.left = x + 'px';
    jellyfish.style.top = '350px';
}

// 黒いクラゲを配置する関数
function placeBlackJellyfish() {
    var x = Math.floor(Math.random() * 421);
    blackJellyfish.style.left = x + 'px';
    blackJellyfish.style.top = (Math.random() * 200 + 50) + 'px';
    blackJellyfish.style.display = 'block';
}

function gameloop() {
    // 通常のクラゲの動き
    var y = parseInt(jellyfish.style.top) - 5;
    if (y < -100) {
        placeJellyfish();
        missJellyfish();
    } else {
        jellyfish.style.top = y + 'px';
    }

    // 黒いクラゲの動き
    var y_blackJellyfish = parseInt(blackJellyfish.style.top) - 3;
    if (y_blackJellyfish < -100) {
        placeBlackJellyfish();
    } else {
        blackJellyfish.style.top = y_blackJellyfish + 'px';
    }
}

// 通常のクラゲをヒットした時の処理
function hitJellyfish() {
    numHits++;
    updateScore();
    placeJellyfish();

    if (numHits == 10) {
        endGame(true); // 勝利
    }
}

// 黒いクラゲをヒットした時の処理
function hitBlackJellyfish() {
    numHits--; // マイナス1点
    updateScore();
    placeBlackJellyfish();

    if (numHits < 0) { 
        endGame(false, 'Don\'t hit the black jellyfish!');
    }
}

// 通常のクラゲをミスした時の処理
function missJellyfish() {
    miss++;
    updateScore();
    if (miss == 2) {
        endGame(false); // 敗北
    }
}

// スコア表示を更新する関数
function updateScore() {
    output.innerHTML = "Hits: " + numHits + " / Misses: " + miss;
}

// ゲーム終了処理をまとめる関数
function endGame(isWin, message) {
    clearInterval(gameTimer); // ゲームループを停止
    document.getElementById('endScreen').style.display = 'block';

    if (isWin) {
        txtEndTitle.innerHTML = 'You Win!!!';
        txtEndMessage.innerHTML = 'Congratulations!';
    } else {
        txtEndTitle.innerHTML = 'You Lose...';
        txtEndMessage.innerHTML = message || 'Try again!'; // カスタムメッセージがなければデフォルト表示
    }
}