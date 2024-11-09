import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { QuizComponent} from "./quiz/quiz.component"
import { ConnexionComponent } from "./connexion/connexion.component"
import { RegisterComponent } from "./register/register.component"
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: "quiz", component: QuizComponent },
  { path: 'quiz/:id', component: QuizDetailComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
