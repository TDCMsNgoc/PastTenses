// Danh sách 20 câu hỏi trắc nghiệm các thì Quá khứ (Past Tenses)
// Biên soạn chuẩn ngữ pháp tiếng Anh với giải thích chi tiết

const quizQuestions = [
  {
    id: 1,
    question: "Yesterday morning, I _____ my school bag carefully, and then I _____ home for class.",
    options: [
      { key: "A", text: "am checking, leave" },
      { key: "B", text: "had been checking, left" },
      { key: "C", text: "had checked, was leaving" },
      { key: "D", text: "checked, left" }
    ],
    correct: "D",
    explanation: {
      rule: "Thì Quá khứ đơn (Past Simple)",
      signal: "Yesterday morning, liên từ 'and then'",
      detail: "Diễn tả một chuỗi các hành động ngắn xảy ra liên tiếp nhau trong quá khứ. Cả hai hành động 'kiểm tra cặp sách' và 'rời nhà' đều xảy ra và kết thúc sáng hôm qua nên dùng Quá khứ đơn cho cả hai vế (checked, left)."
    }
  },
  {
    id: 2,
    question: "Lisa’s hands were dirty because she _____ in the garden with her little brother all afternoon before dinner.",
    options: [
      { key: "A", text: "worked" },
      { key: "B", text: "was working" },
      { key: "C", text: "had been working" },
      { key: "D", text: "had worked" }
    ],
    correct: "C",
    explanation: {
      rule: "Thì Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)",
      signal: "were dirty (kết quả ở QK), all afternoon (khoảng thời gian kéo dài), before dinner (trước mốc QK)",
      detail: "Diễn tả một hành động đã diễn ra liên tục trong một khoảng thời gian ('all afternoon') trước một hành động/thời điểm khác trong quá khứ ('before dinner') và để lại kết quả trong quá khứ ('hands were dirty'). Cấu trúc: S + had been + V-ing."
    }
  },
  {
    id: 3,
    question: "The ground was very wet because it _____ heavily for several hours before the sun came out.",
    options: [
      { key: "A", text: "rained" },
      { key: "B", text: "was raining" },
      { key: "C", text: "had rained" },
      { key: "D", text: "had been raining" }
    ],
    correct: "D",
    explanation: {
      rule: "Thì Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)",
      signal: "was very wet (kết quả QK), for several hours (khoảng thời gian), before the sun came out",
      detail: "Nhấn mạnh tính liên tục của hành động mưa lớn kéo dài nhiều giờ liền trước khi mặt trời ló rạng và để lại kết quả mặt đất rất ướt. Cấu trúc: had been raining."
    }
  },
  {
    id: 4,
    question: "The boys _____ the classroom before the teacher arrived, so she was very pleased when she saw it.",
    options: [
      { key: "A", text: "cleaned" },
      { key: "B", text: "were cleaning" },
      { key: "C", text: "had cleaned" },
      { key: "D", text: "had been cleaning" }
    ],
    correct: "C",
    explanation: {
      rule: "Thì Quá khứ hoàn thành (Past Perfect)",
      signal: "before the teacher arrived (trước hành động QK đơn)",
      detail: "Diễn tả hành động dọn dẹp lớp học đã hoàn tất trước khi cô giáo bước vào lớp (nhấn mạnh kết quả hoàn thành). Cấu trúc: S + had + V3/ed (had cleaned)."
    }
  },
  {
    id: 5,
    question: "My sister _____ her favorite storybook again last night, and then she went to bed.",
    options: [
      { key: "A", text: "reads" },
      { key: "B", text: "was reading" },
      { key: "C", text: "read" },
      { key: "D", text: "had been reading" }
    ],
    correct: "C",
    explanation: {
      rule: "Thì Quá khứ đơn (Past Simple)",
      signal: "last night, and then she went to bed",
      detail: "Diễn tả chuỗi hành động nối tiếp nhau trong quá khứ: đọc sách xong rồi đi ngủ. Động từ 'read' ở dạng quá khứ viết giống nguyên mẫu nhưng phát âm là /red/."
    }
  },
  {
    id: 6,
    question: "At 8 o’clock last night, my brother _____ his homework while my mother _____ dinner in the kitchen.",
    options: [
      { key: "A", did: "did, made", text: "did, made" },
      { key: "B", text: "was doing, was making" },
      { key: "C", text: "had done, was made" },
      { key: "D", text: "had been doing, makes" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ tiếp diễn (Past Continuous)",
      signal: "At 8 o’clock last night (thời điểm xác định trong QK), liên từ 'while'",
      detail: "Diễn tả hai hành động diễn ra song song cùng một lúc tại thời điểm xác định trong quá khứ: anh trai đang làm bài tập trong khi mẹ đang nấu ăn. Cấu trúc: was/were + V-ing."
    }
  },
  {
    id: 7,
    question: "Tom was very tired because he _____ football with his friends for more than two hours before he came home.",
    options: [
      { key: "A", text: "played" },
      { key: "B", text: "was playing" },
      { key: "C", text: "had played" },
      { key: "D", text: "had been playing" }
    ],
    correct: "D",
    explanation: {
      rule: "Thì Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)",
      signal: "was very tired, for more than two hours, before he came home",
      detail: "Nhấn mạnh quá trình chơi bóng đá kéo dài liên tục hơn 2 tiếng trước khi Tom về nhà, để lại kết quả Tom rất mệt mỏi. Cấu trúc: had been playing."
    }
  },
  {
    id: 8,
    question: "When I _____ Anna yesterday afternoon, she _____ a library book at the front desk.",
    options: [
      { key: "A", text: "saw, returned" },
      { key: "B", text: "saw, was returning" },
      { key: "C", text: "was seeing, had returned" },
      { key: "D", text: "had seen, had been returning" }
    ],
    correct: "B",
    explanation: {
      rule: "Sự kết hợp giữa Quá khứ đơn & Quá khứ tiếp diễn",
      signal: "When, yesterday afternoon",
      detail: "Một hành động đang diễn ra trong quá khứ (Anna đang trả sách - was returning) thì một hành động ngắn khác xen vào (tôi nhìn thấy - saw). Động từ 'see' là động từ tri giác không chia tiếp diễn."
    }
  },
  {
    id: 9,
    question: "They were tired because they _____ for the school bus for nearly forty minutes before it finally arrived.",
    options: [
      { key: "A", text: "waited" },
      { key: "B", text: "were waiting" },
      { key: "C", text: "had waited" },
      { key: "D", text: "had been waiting" }
    ],
    correct: "D",
    explanation: {
      rule: "Thì Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)",
      signal: "were tired, for nearly forty minutes, before it finally arrived",
      detail: "Hành động chờ đợi xe buýt kéo dài liên tục gần 40 phút trước khi xe đến, gây ra kết quả là họ bị mệt -> had been waiting."
    }
  },
  {
    id: 10,
    question: "While the children _____ in the yard, their father _____ the broken window in the kitchen.",
    options: [
      { key: "A", text: "played, was repairing" },
      { key: "B", text: "were playing, was repairing" },
      { key: "C", text: "were playing, repaired" },
      { key: "D", text: "had played, repaired" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ tiếp diễn (Past Continuous)",
      signal: "While",
      detail: "Hai hành động diễn ra song song cùng một lúc trong quá khứ: lũ trẻ đang chơi ngoài sân trong khi người bố đang sửa cửa sổ. Cả 2 vế đều dùng Quá khứ tiếp diễn (were playing, was repairing)."
    }
  },
  {
    id: 11,
    question: "By the time the teacher entered the classroom, the students _____ all the chairs into neat rows.",
    options: [
      { key: "A", text: "had arranged" },
      { key: "B", text: "were arranging" },
      { key: "C", text: "arranged" },
      { key: "D", text: "had been arranging" }
    ],
    correct: "A",
    explanation: {
      rule: "Thì Quá khứ hoàn thành (Past Perfect)",
      signal: "By the time + S + V(quá khứ đơn)",
      detail: "Công thức: By the time + QK đơn, QK hoàn thành (had + V3/ed). Hành động xếp ghế đã hoàn tất trước thời điểm giáo viên bước vào phòng học -> had arranged."
    }
  },
  {
    id: 12,
    question: "Yesterday, my father _____ home late because he had an important meeting at the office.",
    options: [
      { key: "A", text: "comes" },
      { key: "B", text: "came" },
      { key: "C", text: "had come" },
      { key: "D", text: "had been coming" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ đơn (Past Simple)",
      signal: "Yesterday",
      detail: "Diễn tả một sự việc đã xảy ra và kết thúc trong quá khứ với thời gian xác định (hôm qua bố về nhà muộn). Quá khứ của 'come' là 'came'."
    }
  },
  {
    id: 13,
    question: "While we _____ to school yesterday morning, we _____ a rainbow in the sky after the rain stopped.",
    options: [
      { key: "A", text: "walked, was seeing" },
      { key: "B", text: "were walking, saw" },
      { key: "C", text: "had walked, saw" },
      { key: "D", text: "had been walking, was seeing" }
    ],
    correct: "B",
    explanation: {
      rule: "Sự kết hợp giữa Quá khứ tiếp diễn & Quá khứ đơn",
      signal: "While, yesterday morning",
      detail: "Hành động đang diễn ra (chúng tôi đang đi bộ đến trường - were walking) thì có một hành động bất chợt xen vào (chúng tôi nhìn thấy cầu vồng - saw)."
    }
  },
  {
    id: 14,
    question: "James looked tired in class because he _____ for the math test since early morning before the lesson began.",
    options: [
      { key: "A", text: "studied" },
      { key: "B", text: "was studying" },
      { key: "C", text: "had studied" },
      { key: "D", text: "had been studying" }
    ],
    correct: "D",
    explanation: {
      rule: "Thì Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)",
      signal: "looked tired, since early morning, before the lesson began",
      detail: "Nhấn mạnh tính liên tục của hành động học bài từ sáng sớm trước khi tiết học bắt đầu, để lại kết quả James trông rất mệt mỏi trong lớp -> had been studying."
    }
  },
  {
    id: 15,
    question: "Last month, our class _____ a science museum and _____ many interesting facts about space.",
    options: [
      { key: "A", text: "visits, had learned" },
      { key: "B", text: "visited, learned" },
      { key: "C", text: "had visited, learn" },
      { key: "D", text: "had been visiting, am learning" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ đơn (Past Simple)",
      signal: "Last month, liên từ 'and'",
      detail: "Diễn tả các hành động nối tiếp nhau đã diễn ra và kết thúc hoàn toàn trong quá khứ (tháng trước lớp chúng tôi đã đến thăm bảo tàng và học được nhiều điều thú vị) -> visited, learned."
    }
  },
  {
    id: 16,
    question: "Last weekend, we _____ our grandparents and helped them clean the garden behind their house.",
    options: [
      { key: "A", text: "visit" },
      { key: "B", text: "visited" },
      { key: "C", text: "had visited" },
      { key: "D", text: "had been visiting" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ đơn (Past Simple)",
      signal: "Last weekend, and helped",
      detail: "Sự việc xảy ra vào cuối tuần trước, đi liền với động từ quá khứ 'helped' -> chia Quá khứ đơn: visited."
    }
  },
  {
    id: 17,
    question: "The teacher _____ the lesson before the principal came into the classroom to speak to us.",
    options: [
      { key: "A", text: "started" },
      { key: "B", text: "was starting" },
      { key: "C", text: "had started" },
      { key: "D", text: "had been starting" }
    ],
    correct: "C",
    explanation: {
      rule: "Thì Quá khứ hoàn thành (Past Perfect)",
      signal: "before the principal came (trước một hành động QK đơn)",
      detail: "Hành động giáo viên bắt đầu bài học đã xảy ra và hoàn tất trước khi thầy hiệu trưởng bước vào lớp -> Dùng Quá khứ hoàn thành: had started."
    }
  },
  {
    id: 18,
    question: "She was nervous because she _____ a presentation in front of the whole class before that day.",
    options: [
      { key: "A", text: "never gave" },
      { key: "B", text: "was never giving" },
      { key: "C", text: "had never given" },
      { key: "D", text: "had never been giving" }
    ],
    correct: "C",
    explanation: {
      rule: "Thì Quá khứ hoàn thành (Past Perfect)",
      signal: "never, before that day (trước ngày hôm đó)",
      detail: "Diễn tả một kinh nghiệm, trải nghiệm chưa từng xảy ra tính đến một thời điểm trong quá khứ. Cấu trúc: S + had never + V3/ed (had never given)."
    }
  },
  {
    id: 19,
    question: "Yesterday morning, the students _____ quietly in the exam room while the teacher _____ around and _____ them.",
    options: [
      { key: "A", text: "wrote, walked, watched" },
      { key: "B", text: "were writing, was walking, watching" },
      { key: "C", text: "had written, walked, was watching" },
      { key: "D", text: "had been writing, walked, watching" }
    ],
    correct: "B",
    explanation: {
      rule: "Thì Quá khứ tiếp diễn (Past Continuous)",
      signal: "Yesterday morning, while",
      detail: "Diễn tả các hành động đang cùng lúc diễn ra trong phòng thi: học sinh đang cặm cụi viết bài (were writing), trong khi giáo viên đang đi lại và quan sát các em (was walking and watching - rút gọn 'was' ở động từ thứ 2 nối bởi 'and')."
    }
  },
  {
    id: 20,
    question: "By the time we _____ the station, the train _____ already, so we had to wait for the next one.",
    options: [
      { key: "A", text: "reached, left" },
      { key: "B", text: "were reaching, was leaving" },
      { key: "C", text: "reached, had left" },
      { key: "D", text: "reach, had been leaving" }
    ],
    correct: "C",
    explanation: {
      rule: "Sự phối hợp thì: By the time + QK đơn, QK hoàn thành",
      signal: "By the time, already, so we had to wait",
      detail: "Hành động chúng tôi đến ga chia ở Quá khứ đơn (reached), còn hành động tàu đã rời đi xảy ra trước đó chia ở Quá khứ hoàn thành (had left)."
    }
  }
];
