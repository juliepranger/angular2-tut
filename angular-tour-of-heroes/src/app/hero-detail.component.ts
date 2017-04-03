import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService }              from './hero.service';
import { Hero }                     from './hero';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){}
  
  ngOnInit(): void {
    // maps the ID in the Observable route parameters to a new Observable,
    // the result of the HeroService.getHero() method
    // If a user re-navigates to this component while a getHero request is still
    //    processing, switchMap cancels the old request and then
    //    calls HeroService.getHero() again.
    // The hero id is a number. Route params are always strings. Route param
    //    value is converted to a number with the Javascript (+) operator.
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  // a "back" button to the previous step in the browser's history stack
  //    using the Location service
  goBack(): void {
    this.location.back()
  }
  save(): void {
    this.heroService.update(this.hero)
        .then(() => this.goBack());
  }
}