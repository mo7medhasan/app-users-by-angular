import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports:[MatProgressSpinnerModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: any;
  public id: number;
  public testId!: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.id = -1;
    this.user = null;
  }

  public  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      this.getUser()
    });
  }
  

  public getUser(): void {
    if (this.id !== -1) {
      this.apiService.getUser(this.id).subscribe(user => {
        this.user = user;
      
        
      });
    }
  }

  public back(): void {
    window.history.back();
  }

  @Input()
  set userId(val: number) {
    if (val !== undefined) {
      this.id = val;
      this.getUser();
    }
  }
}