<template>
  <v-container fluid>
    <v-list outlined rounded>

      <v-list-group
        v-for="question in questions"
        :key="question.id"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-h6" v-text="question.content"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          ripple
          v-for="answer in question.answers"
          :key="answer.id"
        >
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold"
              v-if="checkValidityOfAnswer(answer)"
              v-text="answer.answeredRole.user.username"
            ></v-list-item-title>
            <v-list-item-subtitle class="font-italic" v-text="answer.content"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Submit your answer:</v-list-item-title>
            <v-text-field v-model="question.answer.content" class="mt-3" outlined rounded dense></v-text-field>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click="submitAnswer(question)" class="mt-2" outlined>Submit</v-btn>
          </v-list-item-action>
        </v-list-item>

      </v-list-group>

      <v-list-group
        v-if="userRoleType !== 'PARTICIPANT'"
        no-action
        v-model="addQuestionGroup"
        :value="addQuestionGroup"
      >

        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              v-if="!addQuestionGroup"
              class="text-h6 text-center green--text"
            >
              Add question
            </v-list-item-title>

            <v-list-item-title
              v-else
              class="text-h5"
            >
              Type your question:
            </v-list-item-title>

          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-textarea v-model="question.content" outlined rounded dense rows="3" no-resize></v-textarea>
            <v-btn color="green" dark @click="createQuestion">Add</v-btn>
          </v-list-item-content>
        </v-list-item>

      </v-list-group>

    </v-list>
  </v-container>
</template>

<script>
import vuexStates from '../../mixins/vuexStates'

export default {
  name: 'qa',
  data: () => ({
    addQuestionGroup: false,
    question: {
      content: ''
    },
    questions: [
      {
        id: '1', content: 'question number 1!',
        answer: { content: ''},
        answers: [
          {id: '1', content: 'answer 1 of question 1!'},
          {id: '2', content: 'answer 2 of question 1!'},
        ]
      },
      {id: '2', content: 'question number 2', answer: { content: ''}},
      {id: '3', content: 'question number 3!', answer: { content: ''}},
    ]
  }),
  mixins: [vuexStates],
  methods: {
    checkValidityOfAnswer(answer) {
      return answer.answeredRole && answer.answeredRole.user
    },
    submitAnswer(question) {
      this.$stomp.send(`/app/question/${question.id}/addAnswer`, JSON.stringify(question.answer), {})
      question.answer.content = ''
    },
    createQuestion() {
      this.$stomp.send(`/app/room/${this.joinedRoomId}/addQuestion`, JSON.stringify(this.question), {})
      this.question.content = ''
    },
    async fetchQuestions() {
      try {
        const {data} = await this.$axios.get(`api/rooms/${this.joinedRoomId}/questions`, {
          headers: this.$store.getters.tokenHeader
        })
        this.questions = data.map(e => {
          return {
            ...e,
            answer: {
              content: ''
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    subscribeQuestions() {
      this.$stomp.subscribe(`/topic/room/${this.joinedRoomId}/questions`, (payload) => {
        const questionEvent = JSON.parse(payload.body)
        console.log('**********Question event coming**********')
        console.log(questionEvent)

        if (questionEvent.question){
          questionEvent.question = {
            ...questionEvent.question,
            answer: {
              content: ''
            }
          }
        }

        if (questionEvent.type === 'CREATE') {
          this.questions.push(questionEvent.question)
        } else if (questionEvent.type === 'UPDATE') {
          this.questions = this.questions.map(e => {
            if (e.id === questionEvent.question.id) {
              return questionEvent.question
            }
            return e
          })
        } else if (questionEvent.type === 'DELETE') {
          this.questions = this.questions.filter(e => e.id !== questionEvent.questionId)
        }
      })
    },
    subscribeAnswers() {
      this.$stomp.subscribe(`/topic/room/${this.joinedRoomId}/answers`, (payload) => {
        const answerEvent = JSON.parse(payload.body)
        console.log('**********Answer event coming**********')
        console.log(answerEvent)

        const questionOfAnswer = this.questions.find(e => e.id === answerEvent.answer.questionId)
        if (!questionOfAnswer) return

        if (answerEvent.type === 'CREATE') {
          questionOfAnswer.answers.push(answerEvent.answer)
        } else if (answerEvent.type === 'UPDATE') {
          questionOfAnswer.answers = questionOfAnswer.answers.map(e => {
            if (e.id === answerEvent.answer.id) {
              return answerEvent.answer
            }
            return e
          })
        } else if (answerEvent.type === 'DELETE') {
          questionOfAnswer.answers = questionOfAnswer.answers.filter(e => e.id !== answerEvent.answerId)
        }
      })
    }
  },
  async mounted() {
    await this.fetchQuestions()

    this.subscribeQuestions()
    this.subscribeAnswers()
  }
}
</script>
