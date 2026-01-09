import { defineStore } from "pinia";

export const useFaqsStore = defineStore("faqs", {
  state: () => ({
    faqs: [
      {
        question: "Who is the Socratic Sales Method for?",
        answer:
          "This program is for agencies, coaches, and high ticket closers who want to stop relying on scripts and start signing consistent four and five figure clients. It works whether you are just starting out or already experienced.",
        isOpen: false,
        contentHeight: 0,
      },
      {
        question: "How is this different from other sales coaching?",
        answer:
          "Most sales trainings give you scripts, memorized lines, or surface level tactics. The Socratic Method goes deeper. It teaches you how the human brain makes decisions and how to guide conversations naturally. No BS tactics. Just pure psychology, philosophy and human nature applied to sales.",
        isOpen: false,
        contentHeight: 0,
      },
      {
        question: "Can I get personal coaching or mentorship?",
        answer:
          "Yes. You get one-on-one coaching and personalized WhatsApp access, so you basically have direct access to our brains whenever you need guidance.",
        isOpen: false,
        contentHeight: 0,
      },
      {
        question: "How fast will I see results?",
        answer:
          "Most clients begin closing four and five figure business owners within 30 to 60 days depending on effort and number of calls.",
        isOpen: false,
        contentHeight: 0,
      },
    ],
  }),
  actions: {
    toggleAccordion(index) {
      this.faqs.forEach((item, i) => {
        if (i !== index) {
          item.isOpen = false;
        }
      });
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
    setContentHeight(index, height) {
      this.faqs[index].contentHeight = height;
    },
  },
});
