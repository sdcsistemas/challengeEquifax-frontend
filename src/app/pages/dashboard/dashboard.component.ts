import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public jsonResponse: any;
  public showResponse: boolean = false;
  coordinates: Coordinates;

  constructor(private http: HttpClient) {
    this.coordinates = new Coordinates();
  }
  ngOnInit(): void {
    
  }

  getGeolocalization() {
    this.showResponse = false;
    this.http.get<any>('http://localhost:8080/coordinates/findByLatAndLng/' + this.coordinates.lat + '/' + this.coordinates.lng)
    .subscribe(
      (data: any[]) => {
        this.jsonResponse = data;
        this.showResponse = true;
        console.log(data); // Log the response to see the data structure
      },
      (error) => {
        alert("No se han encontrado resultados")
      }
    );
  
  }
}

export class Coordinates { 
  lat: string;
  lng: string;
  description: string;
  observation: string;
    constructor() {
      this.lat = '';
      this.lng = '';
      this.description = '';
      this.observation = '';
    } 
}


