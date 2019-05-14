import ObservableModel from "../ObservableModel";
const API_BASE_URL= "https://redtachyon.eu.pythonanywhere.com";
const httpOptions = {
    headers: { "Authorization": "SKELETON_KEY"}
};
class StudentModel extends ObservableModel {
    
    constructor() {
        super();
        this.teacher = "Tina Erklund";
        this.questionnaire = "1";
        this.questions = [];
        this.responses = [];
        this.stId = "15"; 
    }

    /* not needed yet 
    setTeacher(teacher) {
        this.teacher = teacher;
    }*/
    getTeacher(){
        return  this.teacher;
    }
    getStudentId() {
        return this.stId;
    }
    getAllQuestionnaires(studentID) {
        const url = `${API_BASE_URL}/api/student/get_questionnaires/` + studentID;
        return fetch(url, httpOptions).then(this.processResponse);
    }
    fetchQuestions(studentID, questionnaireID) {
        this.questionnaire = questionnaireID;
        const url = `${API_BASE_URL}/api/student/questionnaire_info/` + studentID + `/` + questionnaireID;
        return fetch(url, httpOptions).then(this.processResponse);
    }
    setQuestions(qs) {
        this.questions = qs;
    }
    getQuestions() {
        return this.questions;
    }
    getQuestionnaire() {
        return this.questionnaire;
    }
    setQuestionnaire(qs) {
        this.questionnaire = qs;
    }
    setAnswerMarked(idQ, idA) {
        let mark = this.questions[idQ].answers[idA].marked;
        this.questions[idQ].answers[idA].marked = !mark;
    }
    setResponses(responseUpdate) {
        this.responses = responseUpdate;
    }
    getResponses() {
        return this.responses;
    }
    getResponsesForQ(questionID) {
        return this.responses[questionID];
    }
    setResponsesForQ(questionID, answered) {
        this.responses[questionID] = answered;
    }
    // data parameter: {responses: this.responses}
    submitQuestionnaire(studentID, data = {}) {
        const url = `${API_BASE_URL}/api/student/questionnaire_reply/` + studentID + `/` + this.questionnaire;
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            mode: "cors", // no-cors, cors, *same-origin
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(this.processResponse2);
    }

    createAccount(email, password, name, role) {
        console.log("creating a new account");
        const url = `${API_BASE_URL}/auth/register`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': "SKELETON_KEY",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                role: role
            })
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
    processResponse2(response) {
        if (response.ok) {
            return response;
        }
        throw response;
    }
}

export const modelInstance = new StudentModel();
export default modelInstance;