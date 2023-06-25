import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params.term) this.searchTerm = params.term;
    })
  }

  search(term: string): void {
    if(term.length > 0) {
      this.router.navigate(['/search', term]);
    }
  }

}
