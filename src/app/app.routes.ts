import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './modules/auth/login/login.component';

export const routes: Routes = [
  // Redirect root to login
  { 
    path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' 
  },
  
  // Auth routes (no layout)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  
  // Protected routes with layout
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard], // Uncomment when guard is ready
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'escalas-ordinarias',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/escalas-ordinarias/escala-list/escala-list').then(m => m.EscalaListComponent)
          },
          {
            path: 'form',
            loadComponent: () => import('./modules/escalas-ordinarias/escala-form/escala-form').then(m => m.EscalaFormComponent)
          },
          {
            path: 'form/:id',
            loadComponent: () => import('./modules/escalas-ordinarias/escala-form/escala-form').then(m => m.EscalaFormComponent)
          },
          {
            path: 'detail/:id',
            loadComponent: () => import('./modules/escalas-ordinarias/escala-detail/escala-detail').then(m => m.EscalaDetailComponent)
          },
          {
            path: 'calendar',
            loadComponent: () => import('./modules/escalas-ordinarias/escala-calendar/escala-calendar').then(m => m.EscalaCalendarComponent)
          }
        ]
      },
      {
        path: 'ras',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/ras/ras-list/ras-list').then(m => m.RASListComponent)
          },
          {
            path: 'form',
            loadComponent: () => import('./modules/ras/ras-form/ras-form').then(m => m.RASFormComponent)
          },
          {
            path: 'form/:id',
            loadComponent: () => import('./modules/ras/ras-form/ras-form').then(m => m.RASFormComponent)
          },
          {
            path: 'detail/:id',
            loadComponent: () => import('./modules/ras/ras-detail/ras-detail').then(m => m.RASDetailComponent)
          }
        ]
      },
      {
        path: 'trocas',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/troca/troca-list/troca-list').then(m => m.TrocaListComponent)
          },
          {
            path: 'form',
            loadComponent: () => import('./modules/troca/troca-form/troca-form').then(m => m.TrocaFormComponent)
          },
          {
            path: 'detail/:id',
            loadComponent: () => import('./modules/troca/troca-detail/troca-detail').then(m => m.TrocaDetailComponent)
          }
        ]
      },
      {
        path: 'pagamentos',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/pagamentos/pagamento-list/pagamento-list').then(m => m.PagamentoListComponent)
          },
          {
            path: 'form',
            loadComponent: () => import('./modules/pagamentos/pagamento-form/pagamento-form').then(m => m.PagamentoFormComponent)
          },
          {
            path: 'form/:id',
            loadComponent: () => import('./modules/pagamentos/pagamento-form/pagamento-form').then(m => m.PagamentoFormComponent)
          },
          {
            path: 'detail/:id',
            loadComponent: () => import('./modules/pagamentos/pagamento-detail/pagamento-detail').then(m => m.PagamentoDetailComponent)
          }
        ]
      }
    ]
  },
  
  // Wildcard route - must be last
  { 
    path: '**', 
    redirectTo: '/auth/login' 
  }
];
