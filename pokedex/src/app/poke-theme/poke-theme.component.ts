import { Component, OnInit, HostListener } from '@angular/core';
import { PokeService } from './poke.service';
import { PokeList, MiniPokeList, Pokemon } from '../shared/Models/PokeTypes';
import { AppConstants } from '../shared/constants/app-constants';
import { CommonUtils } from '../shared/constants/commonUtils';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'poke-theme',
  templateUrl: './poke-theme.component.html',
  styleUrls: ['./poke-theme.component.less']
})
export class PokeThemeComponent implements OnInit {
  public displayCount = 20;
  public isLight: boolean;
  public currentPokeResponse: PokeList;
  private pokeResponse: PokeList;
  public pokeList: Array<MiniPokeList>;
  public isLoading: boolean;
  public pokeFindAcc: string;
  public pokemonArray: Array<Pokemon>;
  public currentPokeList: Array<MiniPokeList>;
  public errorMessage: string;
  public pokeTypesList: Array<MiniPokeList>;
  public pokeTypesRes: PokeList;
  public selectedPokeType: MiniPokeList;
  public selectedPokeSort: string;
  public sortedMiniPokemon: Array<MiniPokeList>;
  public unsortedMiniPokemon: Array<MiniPokeList>;
  public otherComponent: boolean;
  
  public userSelectedActions  = {
    type : 'type',
    search : 'search',
    sort : 'sort',
  }

  iscrollToTopBtn: boolean;

  @HostListener('window:scroll')
  checkScroll() {
    /* window의 scroll top
      Both window.pageYOffset and document.documentElement
      scrollTop returns the same result in all the cases.
      window.pageYOffset is not supported below IE 9.
    */
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.iscrollToTopBtn = scrollPosition >= 800;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mountStickyHeader();
  }

  constructor(private pokeService: PokeService, private router: Router) {}

  ngOnInit() {
    this.otherComponent = false;
    // this.routeSubscriber();
    this.isLight = JSON.parse(localStorage.getItem(AppConstants.themePreference));
    this.isLoading = true;
    this.getPokeList();
    this.getPokeTypesList();
  }

  routeSubscriber() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.otherComponent = event.url === '/';
        }
      }
    )
  }

  getPokeList() {
    this.pokeService.getPokeList().subscribe(
      response => this.pokeListSuccessForHugeData(response),
       e => {
        this.serviceCallToGetNextList(AppConstants.APIURLS.pokeFailSafeUrl);
      },
      () => {this.isLoading = false; this.mountStickyHeader()}
    );
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem(AppConstants.themePreference, JSON.stringify(this.isLight));
  }

  getNextPokeList(pokemons: Array<Pokemon>) {
    this.pokemonArray = pokemons;
    this.pokeService.pokeMasterData = this.pokemonArray;
    if ((this.pokeFindAcc == '' || !this.pokeFindAcc ) && !this.selectedPokeType && !this.selectedPokeSort) {
      const nextURL = this.currentPokeResponse.next ? this.currentPokeResponse.next : AppConstants.APIURLS.pokeNextUrl;
      this.serviceCallToGetNextList(nextURL);
    } else if ((this.pokeFindAcc == '' || !this.pokeFindAcc ) && this.selectedPokeType  && !this.selectedPokeSort) {
      const pokeMiniTypes = this.pokeService.pokeTypeMiniList;
      const currentPokeCount = this.pokeList.length;
      const nextList = pokeMiniTypes.filter((p, i) => i >= currentPokeCount && i < currentPokeCount + this.displayCount)
      this.pokeList = this.pokeList.concat(nextList);
    } else if (this.selectedPokeSort && (this.pokeFindAcc == '' || !this.pokeFindAcc ) && this.selectedPokeType) {
      this.getNextPokeSort();
    }
  }

  serviceCallToGetNextList(nextURL) {
    this.pokeService.getNextPokeList(nextURL).subscribe(
      response => {
        this.pokeList = this.pokeList.concat(response.results);
        this.currentPokeResponse = response;
        this.pokeResponse.next = response.next;
        this.pokeResponse.previous = response.previous;
        this.pokeResponse.results = this.pokeResponse.results.concat(response.results);
        this.currentPokeList = this.pokeList;
      },
      console.log
    );
  }

  pokeSearch() {
    let results = this.pokeService.pokeMiniMasterList.results;
    if (results && results.length > 0 && this.pokeFindAcc) {
      // results = CommonUtils.removeDuplicatesByKey(results, 'name');
      results = results.filter( (poke, i) => poke.name.toLowerCase().includes(this.pokeFindAcc.toLowerCase())
      || i === Number(this.pokeFindAcc) - 1 );

      results = CommonUtils.removeDuplicatesByKey(results, 'name');
      this.pokeList = results;

      if (this.pokeList.length <= 0) {
        this.errorMessage = 'No Results Found !';
      }
    } else if (this.pokeFindAcc === '') {
      this.pokeList = this.currentPokeList;
    }
  }

  getPokeTypesList() {
    this.pokeService.getPokeTypesList().subscribe(
      response => {
        this.pokeTypesRes = response;
        this.pokeTypesList = CommonUtils.sortArrayByKey(response.results, 'name');

      },
      console.log
    );
  }

  getPokemonByType() {
    if (this.selectedPokeType && this.selectedPokeType.url) {
      this.isLoading = true;
      this.pokeService.getPokemonByType(this.selectedPokeType.url).subscribe(
        response => {
          this.pokeList = response.filter((p, i) => i < this.displayCount );
          this.unsortedMiniPokemon = response;
          if(this.pokeList.length == 0 ) {
            this.errorMessage = 'No Results Found !';
          }
        },
        console.log,
        () => {this.isLoading = false; this.mountStickyHeader()}
      );
    } else if (typeof this.selectedPokeType == 'string' && this.selectedPokeType == 'none') {
      this.pokeList = this.currentPokeList;
      this.unsortedMiniPokemon = null;
    }
  }

  pokeSort() {
    if (this.selectedPokeSort != 'none') {
      this.isLoading = true;
      const currentPokeList = this.unsortedMiniPokemon;
      if (currentPokeList && currentPokeList.length > 0) {
        switch (this.selectedPokeSort) {
          case 'name-asc':
            this.sortedMiniPokemon = CommonUtils.sortArrayByKey(currentPokeList, 'name');
            break;
          case 'name-desc':
            this.sortedMiniPokemon = CommonUtils.sortArrayByKey(currentPokeList, 'name', true);
            break;
          case 'id-asc':
            this.sortedMiniPokemon = currentPokeList;
            break;
          case 'id-desc':
            this.sortedMiniPokemon = CommonUtils.reverseArray(currentPokeList);;
            break;
          default:
            break;
        }
        this.pokeList = [];
        this.getNextPokeSort();
        this.isLoading = false;
      } else {
        this.pokeList = this.unsortedMiniPokemon.filter((p, i) => i > 20 );
      }
    } else if (this.selectedPokeSort == 'none') {
      this.selectedPokeSort = null;
      this.getPokemonByType();
      // this.pokeList = this.currentPokeList;
    }
  }

  getNextPokeSort() {
    const nextPokeList = this.sortedMiniPokemon.filter((poke, i) =>
    i >= this.pokeList.length && i < this.pokeList.length + this.displayCount );
    this.pokeList = this.pokeList.concat(nextPokeList);
  }

  pokeListSuccessForHugeData(response) {
    this.currentPokeResponse = response;
    this.pokeResponse = response;
    this.pokeList = response.results.filter((p, i) => i < this.displayCount );
    this.currentPokeList = response.results.filter((p, i) => i < this.displayCount );
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  userSelectedAction(action) {
    this.mountStickyHeader();
    switch (action) {
      case this.userSelectedActions.search:
        // call search fn
        this.selectedPokeType = null;
        this.selectedPokeSort = null;
        // sort var as null
        this.pokeSearch();
        break;
      case this.userSelectedActions.type:
      // call type fn
      this.pokeFindAcc = null;
      this.selectedPokeSort = null;
      // sort var as null
      this.getPokemonByType();
      break;
      case this.userSelectedActions.sort:
      // call sort fn
      this.pokeFindAcc = null;
      // this.selectedPokeType = null;
      this.pokeSort();
      break;
      default:
      break;
    }
  }

  mountStickyHeader() {
    try {
      setTimeout(() => {
        const scrollComp = document.getElementsByClassName('scroll-ovf')[0];
        const header = document.getElementById('stickyHeader');
        const body = document.getElementsByTagName('body')[0];
        (scrollComp as any).style.height = body.clientHeight - header.clientHeight + 'px';
      });
    } catch (e) {}
  }

}
