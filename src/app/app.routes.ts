import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'form', component: FormComponent},
    { path: 'quiz', component: QuizComponent},
];
