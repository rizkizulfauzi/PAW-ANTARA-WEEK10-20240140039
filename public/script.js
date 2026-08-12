const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const saveHistory = document.getElementById("saveHistory");
const statusText = document.getElementById("status");

const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const historyList = document.getElementById("historyList");


// ==========================================
// TAMBAH PESAN KE CHAT
// ==========================================

function addMessage(text, type) {

  const wrapper = document.createElement("div");

  if (type === "user") {

    wrapper.className =
      "flex items-start gap-3 justify-end";

  } else {

    wrapper.className =
      "flex items-start gap-3";

  }


  const avatar = document.createElement("div");

  avatar.className =
    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 " +
    (type === "user"
      ? "bg-blue-100"
      : "bg-slate-200");

  avatar.textContent =
    type === "user" ? "👤" : "🤖";


  const bubble = document.createElement("div");

  bubble.className =
    type === "user"
      ? "bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[75%]"
      : "bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[75%]";


  const textElement = document.createElement("p");

  textElement.className =
    "whitespace-pre-wrap";

  textElement.textContent = text;


  bubble.appendChild(textElement);

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);

  chatBox.appendChild(wrapper);

  chatBox.scrollTop =
    chatBox.scrollHeight;
}


// ==========================================
// KIRIM PESAN KE AI
// ==========================================

async function sendMessage() {

  const message =
    messageInput.value.trim();


  if (!message) {

    alert("Pesan tidak boleh kosong.");

    return;

  }


  sendBtn.disabled = true;

  statusText.textContent =
    "AI sedang menjawab...";


  addMessage(
    message,
    "user"
  );


  messageInput.value = "";


  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: message
        })

      });


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Gagal menghubungi AI"
      );

    }


    const reply =
      result.data.reply;


    addMessage(
      reply,
      "ai"
    );


    // SIMPAN JIKA USER SETUJU

    if (saveHistory.checked) {

      await saveChatHistory(
        message,
        reply
      );

    }


    statusText.textContent =
      "Selesai.";

  } catch (error) {

    console.error(error);

    addMessage(
      "Maaf, terjadi kesalahan saat menghubungi server.",
      "ai"
    );

    statusText.textContent =
      "Terjadi kesalahan.";

  } finally {

    sendBtn.disabled = false;

    messageInput.focus();

  }

}


// ==========================================
// CREATE HISTORY
// ==========================================

async function saveChatHistory(
  message,
  reply
) {

  try {

    const response =
      await fetch(
        "/api/chat/history",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            message: message,

            reply: reply,

            saveHistory: true

          })

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      console.error(
        "Gagal menyimpan history:",
        result.message
      );

      return;

    }


    statusText.textContent =
      "Pesan dan riwayat berhasil disimpan.";

  } catch (error) {

    console.error(
      "History error:",
      error
    );

  }

}


// ==========================================
// GET HISTORY
// ==========================================

async function loadHistory() {

  historyList.innerHTML = `
    <p class="text-center text-slate-500">
      Memuat riwayat...
    </p>
  `;


  try {

    const response =
      await fetch(
        "/api/chat/history"
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Gagal mengambil history"
      );

    }


    const histories =
      result.data;


    if (
      !histories ||
      histories.length === 0
    ) {

      historyList.innerHTML = `
        <div class="text-center py-10">
          <div class="text-4xl mb-3">
            📭
          </div>

          <p class="text-slate-500">
            Belum ada riwayat percakapan.
          </p>
        </div>
      `;

      return;

    }


    historyList.innerHTML = "";


    histories.forEach(
      (history) => {

        const item =
          document.createElement("div");

        item.className =
          "border border-slate-200 rounded-xl p-4 bg-slate-50";


        item.innerHTML = `

          <div class="flex gap-3 mb-3">

            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              👤
            </div>

            <div class="flex-1">

              <p class="text-xs text-slate-400 mb-1">
                Kamu
              </p>

              <p class="text-slate-700">
                ${escapeHtml(history.message)}
              </p>

            </div>

          </div>


          <div class="flex gap-3">

            <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              🤖
            </div>

            <div class="flex-1">

              <p class="text-xs text-slate-400 mb-1">
                AI
              </p>

              <p class="text-slate-700">
                ${escapeHtml(history.reply)}
              </p>

            </div>

          </div>

        `;


        historyList.appendChild(item);

      }
    );


  } catch (error) {

    console.error(error);

    historyList.innerHTML = `
      <p class="text-center text-red-500">
        Gagal mengambil riwayat.
      </p>
    `;

  }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


// ==========================================
// EVENT
// ==========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


messageInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      sendMessage();

    }

  }
);


historyBtn.addEventListener(
  "click",
  async () => {

    historyModal.classList.remove(
      "hidden"
    );

    historyModal.classList.add(
      "flex"
    );

    await loadHistory();

  }
);


closeHistoryBtn.addEventListener(
  "click",
  () => {

    historyModal.classList.add(
      "hidden"
    );

    historyModal.classList.remove(
      "flex"
    );

  }
);


historyModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === historyModal
    ) {

      historyModal.classList.add(
        "hidden"
      );

      historyModal.classList.remove(
        "flex"
      );

    }

  }
);