import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, FormsModule, NgFor, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
}) // Remove unnecessary imports and standalone configuration
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  public searchResults: any[] = [];
  public searchQuery = 0;
  public searchMess = "";


  users: any[] = [];
  currentPage = 1;
  loading = false; // Track loading state

  constructor(private apiService: ApiService) { }

  onSearch() {
    // Implement search logic
    this.searchMess="";
    this.searchQuery===0?this.searchResults=[]:
this.searchUsers(this.searchQuery)

  }


onPageChange(event: any) {
  this.currentPage = event.pageIndex + 1;
  this.loadUsers();

}
ngOnInit(): void {
  this.loadUsers();
}

loadUsers(): void {
  this.loading = true;
  this.apiService.getUsers(this.currentPage).subscribe(
    (response: any) => {
      this.users = response;
      this.loading = false;
    },
    (error: any) => {
      console.log('Error fetching users:', error);
      this.loading = false;
    }
  );
}
searchUsers(query: number): void {
  this.searchMess=""

  this.loading = true;
  this.apiService.getUser(this.searchQuery).subscribe(
    (response: any) => {
      this.searchResults = [response];
      this.loading = false;
    },
    (error: any) => {
      console.log('Error fetching users:', error);
      this.searchResults = [];
      this.searchMess="this user is not found";
      this.loading = false;
    }
  );
}

}
