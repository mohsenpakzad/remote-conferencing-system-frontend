export default {
  data: () => ({
    fullNameRules: [
      v => !!v || 'Full name is required',
      v => (v && v.length <= 50) || 'Username must be less than or equal to 50 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must be more than or equal to 5 characters'
    ],
    classNameRules: [
      v => !!v || 'Class name is required',
    ],
    lecturerRules: [
      v => !!v || 'lecturer name is required',
    ],
    classInformationRules: [
      v => (v || '' ).length <= 200 || 'Class information must be less than or equal to 200 characters',
    ],
    fieldRules: [
      v => (v && v.length <= 50) || 'Field must be less than or equal to 50 characters',
    ],
    aboutRules: [
      v => (v || '' ).length <= 200  || 'About must be less than or equal to 200 characters',
    ],
    quizNameRules: [
      v => !!v || 'Quiz name is required',
    ],
    questionNameRules: [
      v => !!v || 'Quiz name is required',
    ],
    questionBodyRules: [
      v => !!v  || 'Question Body Cannot Be empty',
    ],
    startDateRules: [
      v => !!v || 'Start date is required',
    ],
    startTimeRules: [
      v => !!v || 'Start time is required',
    ],
    endDateRules: [
      v => !!v || 'End date is required',
    ],
    endTimeRules: [
      v => !!v || 'End time is required',
    ],
  })
}
