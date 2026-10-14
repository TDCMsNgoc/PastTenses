/**
 * PHẦN MỀM TRẮC NGHIỆM 20 CÂU HỎI CÁC THÌ QUÁ KHỨ (PAST TENSES)
 * Tương thích Desktop, iPad và Điện thoại di động
 */

(function () {
  "use strict";

  // Biến trạng thái toàn cục
  const TOTAL_QUESTIONS = quizQuestions.length; // 20 câu
  let currentQuestionIndex = 0; // 0..19 (tương ứng Câu 1..20)
  let userAnswers = {}; // { 1: 'D', 2: 'C', ... }
  let flaggedQuestions = new Set(); // Set các câu đã đặt cờ
  let isSubmitted = false;

  // Thời gian đếm ngược: 27 phút 02 giây (giống hệt ảnh chụp màn hình gốc 00:27:02)
  const INITIAL_SECONDS = 27 * 60 + 2; 
  let remainingSeconds = INITIAL_SECONDS;
  let timerInterval = null;

  // Các phần tử DOM
  const topTimerEl = document.getElementById("topTimer");
  const bottomTimerEl = document.getElementById("bottomTimer");
  const topQuestionIndicatorEl = document.getElementById("topQuestionIndicator");
  const btnFlag = document.getElementById("btnFlag");
  const flagBtnText = document.getElementById("flagBtnText");
  const btnReviewAll = document.getElementById("btnReviewAll");
  
  const questionGridEl = document.getElementById("questionGrid");
  const questionTextEl = document.getElementById("questionText");
  const answersCardEl = document.getElementById("answersCard");
  
  const btnSubmit = document.getElementById("btnSubmit");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const statusCounterEl = document.getElementById("statusCounter");

  // Section & Modals
  const quizMainSection = document.getElementById("quizMainSection");
  const quizFooter = document.getElementById("quizFooter");
  const resultScreen = document.getElementById("resultScreen");

  const submitModal = document.getElementById("submitModal");
  const btnCloseSubmitModal = document.getElementById("btnCloseSubmitModal");
  const btnModalCancel = document.getElementById("btnModalCancel");
  const btnModalConfirm = document.getElementById("btnModalConfirm");
  const modalAnsweredCount = document.getElementById("modalAnsweredCount");
  const modalUnansweredCount = document.getElementById("modalUnansweredCount");
  const modalFlaggedCount = document.getElementById("modalFlaggedCount");
  const modalSummaryBox = document.getElementById("modalSummaryBox");

  const reviewAllModal = document.getElementById("reviewAllModal");
  const btnCloseReviewAllModal = document.getElementById("btnCloseReviewAllModal");
  const btnCloseReviewAll = document.getElementById("btnCloseReviewAll");
  const overviewQuestionsList = document.getElementById("overviewQuestionsList");

  // Result Elements
  const scoreDisplay = document.getElementById("scoreDisplay");
  const scoreSub = document.getElementById("scoreSub");
  const correctCountEl = document.getElementById("correctCount");
  const incorrectCountEl = document.getElementById("incorrectCount");
  const timeSpentEl = document.getElementById("timeSpent");
  const btnRestart = document.getElementById("btnRestart");
  const btnToggleDetails = document.getElementById("btnToggleDetails");
  const reviewListEl = document.getElementById("reviewList");

  // Format thời gian thành HH : MM : SS
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return `${hh} : ${mm} : ${ss}`;
  }

  // Khởi động đồng hồ đếm ngược
  function startTimer() {
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
        saveState();
      } else {
        clearInterval(timerInterval);
        alert("Đã hết thời gian làm bài! Hệ thống sẽ tự động nộp bài của bạn.");
        submitQuiz();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timeFormatted = formatTime(remainingSeconds);
    if (topTimerEl) topTimerEl.textContent = timeFormatted;
    if (bottomTimerEl) bottomTimerEl.textContent = timeFormatted;
  }

  // Khởi tạo bảng 20 nút số câu hỏi (Palette)
  function initQuestionGrid() {
    questionGridEl.innerHTML = "";
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "q-grid-btn";
      btn.textContent = i;
      btn.id = `q-btn-${i}`;
      btn.addEventListener("click", () => {
        goToQuestion(i - 1);
      });
      questionGridEl.appendChild(btn);
    }
  }

  // Cập nhật giao diện của 20 nút trên bảng câu hỏi
  function updateGridStatus() {
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      const btn = document.getElementById(`q-btn-${i}`);
      if (!btn) continue;

      // Xóa các class trạng thái cũ
      btn.classList.remove("active", "answered", "flagged");

      // Nếu đang xem câu này
      if (i - 1 === currentQuestionIndex) {
        btn.classList.add("active");
      }

      // Nếu đã có đáp án
      if (userAnswers[i]) {
        btn.classList.add("answered");
      }

      // Nếu đã đánh dấu cờ
      if (flaggedQuestions.has(i)) {
        btn.classList.add("flagged");
      }
    }

    // Cập nhật bộ đếm câu đã làm
    const answeredCount = Object.keys(userAnswers).length;
    statusCounterEl.textContent = `Đã làm: ${answeredCount}/${TOTAL_QUESTIONS}`;
  }

  // Hiển thị câu hỏi theo index (0..19)
  function renderQuestion(index) {
    if (index < 0 || index >= TOTAL_QUESTIONS) return;
    currentQuestionIndex = index;
    const q = quizQuestions[index];

    // Cập nhật tiêu đề & nhãn
    topQuestionIndicatorEl.textContent = `Câu ${q.id}`;
    questionTextEl.innerHTML = `<strong>Câu ${q.id}:</strong> ${escapeHtml(q.question)}`;

    // Cập nhật trạng thái cờ cho câu hiện tại
    const isFlagged = flaggedQuestions.has(q.id);
    if (isFlagged) {
      btnFlag.classList.add("active");
      flagBtnText.textContent = "Bỏ cờ";
    } else {
      btnFlag.classList.remove("active");
      flagBtnText.textContent = "Đặt cờ";
    }

    // Render danh sách lựa chọn A, B, C, D
    answersCardEl.innerHTML = "";
    q.options.forEach((opt) => {
      const isSelected = userAnswers[q.id] === opt.key;
      const row = document.createElement("div");
      row.className = `option-row ${isSelected ? "selected" : ""}`;
      row.dataset.key = opt.key;

      row.innerHTML = `
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>
        <div class="option-key">${opt.key}.</div>
        <div class="option-text">${escapeHtml(opt.text)}</div>
      `;

      row.addEventListener("click", () => {
        selectOption(q.id, opt.key);
      });

      answersCardEl.appendChild(row);
    });

    // Cập nhật nút Trước / Sau
    if (index === 0) {
      btnPrev.classList.remove("enabled");
      btnPrev.disabled = true;
    } else {
      btnPrev.classList.add("enabled");
      btnPrev.disabled = false;
    }

    if (index === TOTAL_QUESTIONS - 1) {
      btnNext.textContent = "Xem lại / Nộp bài";
    } else {
      btnNext.textContent = "Câu tiếp theo";
    }

    updateGridStatus();
  }

  // Xử lý chọn đáp án
  function selectOption(qId, key) {
    if (isSubmitted) return;

    userAnswers[qId] = key;
    renderQuestion(currentQuestionIndex);
    saveState();
  }

  // Chuyển tới câu hỏi cụ thể
  function goToQuestion(index) {
    renderQuestion(index);
    // Nếu trên điện thoại hoặc ipad, cuộn nhẹ lên đầu khung câu hỏi để tiện đọc
    if (window.innerWidth <= 1024) {
      const contentArea = document.getElementById("quizContentArea");
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // Đặt / Bỏ cờ cho câu hỏi hiện tại
  function toggleFlagCurrentQuestion() {
    const qId = quizQuestions[currentQuestionIndex].id;
    if (flaggedQuestions.has(qId)) {
      flaggedQuestions.delete(qId);
    } else {
      flaggedQuestions.add(qId);
    }
    renderQuestion(currentQuestionIndex);
    saveState();
  }

  // Mở modal xác nhận nộp bài
  function openSubmitModal() {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = TOTAL_QUESTIONS - answeredCount;
    const flaggedCount = flaggedQuestions.size;

    modalAnsweredCount.textContent = `${answeredCount} / ${TOTAL_QUESTIONS}`;
    modalUnansweredCount.textContent = `${unansweredCount} câu`;
    modalFlaggedCount.textContent = `${flaggedCount} câu`;

    if (unansweredCount > 0) {
      modalSummaryBox.classList.add("has-warning");
    } else {
      modalSummaryBox.classList.remove("has-warning");
    }

    submitModal.classList.add("active");
  }

  function closeSubmitModal() {
    submitModal.classList.remove("active");
  }

  // Mở modal ôn 20 câu (tổng quan toàn bộ câu hỏi)
  function openReviewAllModal() {
    overviewQuestionsList.innerHTML = "";
    quizQuestions.forEach((q) => {
      const answered = userAnswers[q.id];
      const isFlagged = flaggedQuestions.has(q.id);

      const item = document.createElement("div");
      item.style.cssText = `
        padding: 10px 14px;
        border-radius: 6px;
        background: ${answered ? "#f0f9ff" : "#f8fafc"};
        border: 1px solid ${answered ? "#bae6fd" : "#e2e8f0"};
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: background 0.15s ease;
      `;

      item.innerHTML = `
        <div style="font-size: 14px; color: #1e293b; max-width: 80%;">
          <strong>Câu ${q.id}:</strong> ${escapeHtml(q.question.substring(0, 70))}...
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${isFlagged ? '<span style="font-size: 13px;">🚩</span>' : ''}
          <span style="font-weight: 700; font-size: 13px; color: ${answered ? '#0284c7' : '#94a3b8'};">
            ${answered ? `Đáp án: ${answered}` : 'Chưa làm'}
          </span>
        </div>
      `;

      item.addEventListener("click", () => {
        closeReviewAllModal();
        goToQuestion(q.id - 1);
      });

      overviewQuestionsList.appendChild(item);
    });

    reviewAllModal.classList.add("active");
  }

  function closeReviewAllModal() {
    reviewAllModal.classList.remove("active");
  }

  // Nộp bài và chấm điểm
  function submitQuiz() {
    closeSubmitModal();
    clearInterval(timerInterval);
    isSubmitted = true;

    // Tính điểm
    let correctTotal = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        correctTotal++;
      }
    });

    const incorrectTotal = TOTAL_QUESTIONS - correctTotal;
    const scoreOnScale10 = ((correctTotal / TOTAL_QUESTIONS) * 10).toFixed(1);
    const timeSpentSeconds = INITIAL_SECONDS - remainingSeconds;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)} phút ${timeSpentSeconds % 60} giây`;

    // Cập nhật giao diện kết quả
    scoreDisplay.textContent = `${correctTotal} / ${TOTAL_QUESTIONS}`;
    scoreSub.textContent = `Thang điểm 10: ${scoreOnScale10} Điểm`;
    correctCountEl.textContent = correctTotal;
    incorrectCountEl.textContent = incorrectTotal;
    timeSpentEl.textContent = timeSpentFormatted;

    // Ẩn khu vực làm bài và footer
    quizMainSection.style.display = "none";
    quizFooter.style.display = "none";
    resultScreen.style.display = "block";

    // Xây dựng danh sách xem lại đáp án và giải thích
    buildDetailedReview();

    // Xóa bộ nhớ tạm sau khi đã nộp thành công
    localStorage.removeItem("past_tenses_quiz_state");
  }

  // Tạo phần giải thích chi tiết 20 câu hỏi về các thì quá khứ
  function buildDetailedReview() {
    reviewListEl.innerHTML = "";

    quizQuestions.forEach((q) => {
      const userChoice = userAnswers[q.id] || "Chưa chọn";
      const isCorrect = userChoice === q.correct;

      const item = document.createElement("div");
      item.className = `review-item ${isCorrect ? "correct" : "incorrect"}`;

      let optionsHtml = "";
      q.options.forEach((opt) => {
        let optClass = "review-opt";
        let statusBadge = "";

        if (opt.key === q.correct) {
          optClass += " is-correct";
          statusBadge = " <span style='color:#166534; font-weight:700;'>(Đáp án chính xác)</span>";
        } else if (opt.key === userChoice) {
          optClass += " user-chosen";
          statusBadge = " <span style='color:#dc2626; font-weight:700;'>(Bạn đã chọn)</span>";
        }

        optionsHtml += `
          <div class="${optClass}">
            <strong>${opt.key}.</strong> ${escapeHtml(opt.text)} ${statusBadge}
          </div>
        `;
      });

      item.innerHTML = `
        <div class="review-q-header">
          <span>Câu ${q.id}: ${escapeHtml(q.question)}</span>
          <span style="color: ${isCorrect ? '#10b981' : '#ef4444'}; font-size: 14px;">
            ${isCorrect ? '✅ Đúng (+0.5đ)' : '❌ Sai'}
          </span>
        </div>
        <div class="review-opt-list">
          ${optionsHtml}
        </div>
        <div class="review-explanation">
          <div><strong>Quy tắc áp dụng:</strong> ${escapeHtml(q.explanation.rule)}</div>
          <div style="margin-top: 4px;"><strong>Dấu hiệu nhận biết:</strong> <em>${escapeHtml(q.explanation.signal)}</em></div>
          <div style="margin-top: 4px;"><strong>Giải thích chi tiết:</strong> ${escapeHtml(q.explanation.detail)}</div>
        </div>
      `;

      reviewListEl.appendChild(item);
    });
  }

  // Làm lại bài thi từ đầu
  function restartQuiz() {
    if (!confirm("Bạn có chắc chắn muốn làm lại bài thi không?")) return;

    userAnswers = {};
    flaggedQuestions.clear();
    isSubmitted = false;
    currentQuestionIndex = 0;
    remainingSeconds = INITIAL_SECONDS;
    localStorage.removeItem("past_tenses_quiz_state");

    resultScreen.style.display = "none";
    reviewListEl.style.display = "none";
    quizMainSection.style.display = "flex";
    quizFooter.style.display = "flex";

    renderQuestion(0);
    startTimer();
  }

  // Lưu trữ tiến độ làm bài (LocalStorage)
  function saveState() {
    if (isSubmitted) return;
    const state = {
      userAnswers,
      flaggedQuestions: Array.from(flaggedQuestions),
      remainingSeconds,
      currentQuestionIndex
    };
    try {
      localStorage.setItem("past_tenses_quiz_state", JSON.stringify(state));
    } catch (e) {
      console.warn("Không thể lưu trạng thái bài thi vào LocalStorage:", e);
    }
  }

  // Khôi phục tiến độ nếu đã lưu
  function loadSavedState() {
    try {
      const raw = localStorage.getItem("past_tenses_quiz_state");
      if (raw) {
        const state = JSON.parse(raw);
        if (state.userAnswers) userAnswers = state.userAnswers;
        if (state.flaggedQuestions) flaggedQuestions = new Set(state.flaggedQuestions);
        if (typeof state.remainingSeconds === "number" && state.remainingSeconds > 0) {
          remainingSeconds = state.remainingSeconds;
        }
        if (typeof state.currentQuestionIndex === "number") {
          currentQuestionIndex = state.currentQuestionIndex;
        }
      }
    } catch (e) {
      console.warn("Không thể đọc trạng thái từ LocalStorage:", e);
    }
  }

  // Thoát ký tự HTML chống XSS
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Đăng ký các sự kiện bàn phím & nút bấm
  function initEventListeners() {
    // Nút Câu trước & Câu tiếp theo
    btnPrev.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        goToQuestion(currentQuestionIndex - 1);
      }
    });

    btnNext.addEventListener("click", () => {
      if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
        goToQuestion(currentQuestionIndex + 1);
      } else {
        openSubmitModal();
      }
    });

    // Nút Đặt cờ
    btnFlag.addEventListener("click", toggleFlagCurrentQuestion);

    // Nút Ôn 20 câu
    btnReviewAll.addEventListener("click", openReviewAllModal);
    btnCloseReviewAllModal.addEventListener("click", closeReviewAllModal);
    btnCloseReviewAll.addEventListener("click", closeReviewAllModal);

    // Nút Kết thúc và nộp bài
    btnSubmit.addEventListener("click", openSubmitModal);
    btnCloseSubmitModal.addEventListener("click", closeSubmitModal);
    btnModalCancel.addEventListener("click", closeSubmitModal);
    btnModalConfirm.addEventListener("click", submitQuiz);

    // Màn hình kết quả
    btnRestart.addEventListener("click", restartQuiz);
    btnToggleDetails.addEventListener("click", () => {
      if (reviewListEl.style.display === "none") {
        reviewListEl.style.display = "flex";
        btnToggleDetails.textContent = "Ẩn bớt giải thích";
      } else {
        reviewListEl.style.display = "none";
        btnToggleDetails.textContent = "📖 Xem giải thích chi tiết 20 câu";
      }
    });

    // Phím tắt tiện lợi (A, B, C, D hoặc 1, 2, 3, 4 hoặc Mũi tên trái/phải)
    document.addEventListener("keydown", (e) => {
      if (isSubmitted || submitModal.classList.contains("active") || reviewAllModal.classList.contains("active")) {
        return;
      }

      const key = e.key.toUpperCase();
      const currentQId = quizQuestions[currentQuestionIndex].id;

      if (key === "ARROWLEFT") {
        if (currentQuestionIndex > 0) goToQuestion(currentQuestionIndex - 1);
      } else if (key === "ARROWRIGHT") {
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) goToQuestion(currentQuestionIndex + 1);
      } else if (["A", "B", "C", "D"].includes(key)) {
        selectOption(currentQId, key);
      } else if (key === "1") {
        selectOption(currentQId, "A");
      } else if (key === "2") {
        selectOption(currentQId, "B");
      } else if (key === "3") {
        selectOption(currentQId, "C");
      } else if (key === "4") {
        selectOption(currentQId, "D");
      } else if (key === "F") {
        toggleFlagCurrentQuestion();
      }
    });
  }

  // Khởi động ứng dụng
  function initApp() {
    initQuestionGrid();
    loadSavedState();
    renderQuestion(currentQuestionIndex);
    initEventListeners();
    startTimer();
  }

  // Chạy khi DOM đã sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
