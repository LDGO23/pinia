import type IStudent from "@/interfaces/IStudent";
import { ref, type Ref } from "vue";

const url = import.meta.env.VITE_API_URL || 'https://65e8dab54bb72f0a9c508303.mockapi.io/dev/api/Alumnos/';

export default class StudentService {
    private students: Ref<IStudent[]>
    private student: Ref<IStudent>

    constructor(){
        this.students = ref([]) as Ref<IStudent[]>
        this.student = ref({}) as Ref<IStudent>
    }

    getStudents(): Ref<IStudent[]>{
        return this.students
    }
    getStudent(): Ref<IStudent>{
        return this.student
    }
    async fetchStudents(): Promise<void>{
        try{
            const json = await fetch(url)
            const response = await json.json()
            this.students = response;
            console.log('Service:'+this.students);
        }
        catch(e){
            console.log(e)
        }
        
    }
    async fetchStudent(id: string): Promise<void>{
        try{
            const json = await fetch(url + id)
            const response = await json.json()
            this.student.value = response
            console.log('Service:'+this.student.value.name)
        }
        catch(e){
            console.log(e)
        }
        
    }

    async createStudent(student: IStudent): Promise<void>{
        try{
            const json = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(student),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await json.json()
            this.students.value = await response
            console.log(response)
        }
        catch(e){
            console.log(e)
        }
    }

    async deleteStudent(id: string): Promise<void>{
        try{
            const json = await fetch(url + id, {
                method: 'DELETE'
            })
            const response = await json.json()
            this.students.value = await response
            console.log(response)
        }
        catch(e){
            console.log(e)
        }
    }
}