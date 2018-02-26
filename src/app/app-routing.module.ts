import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsComponent } from './logs/logs.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                component: DashboardComponent,
                path: '',
            },
            {
                path: 'item/:id',
                component: DetailComponent
            },
            {
                path: 'logs',
                component: LogsComponent
            },
            {
                path: 'form',
                component: FormComponent
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent, DashboardComponent,
    FormComponent, LogsComponent, DetailComponent,
];
