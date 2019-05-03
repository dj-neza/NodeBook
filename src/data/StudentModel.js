import ObservableModel from "../ObservableModel";

class StudentModel extends ObservableModel {
    
    constructor() {
        super();
        this.teacher = "Tina";
        this.questions = [{
                    "content": "Who do you want to sit next to?", 
                    "answers" : [{"content": "Ana", "marked": false}, 
                                {"content": "Ana", "marked": true}, 
                                {"content": "Ana", "marked": false}]
                },
                {
                    "content": "Who do you not want to sit next to?", 
                    "answers" : [{"content": "Ana2", "marked": true}, 
                                {"content": "Ana2", "marked": false}, 
                                {"content": "Ana2", "marked": false}]
                }];
    }

    getTeacher(){
        return  this.teacher;
    }
    getQuestions(){
        return  this.questions;
    }
    setTeacher(teacher) {
        this.teacher = teacher;
    }
    setAnswerMarked(idQ, idA) {
        let mark = this.questions[idQ].answers[idA].marked;
        this.questions[idQ].answers[idA].marked = !mark;
    }
}

export const modelInstance = new StudentModel();
export default modelInstance;