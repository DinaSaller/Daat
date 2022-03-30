import { Component, OnInit } from '@angular/core';
import { Service } from '../service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: Service) { }
  url = "assets/response.json";
  list: any[] = []; newList: any[] = []
  search: any;
  sortByasc: any = true
  types: any[] = [];
  toggle = true;
  classList: any;
  mediaCount = 0; seriesCount = 0; gamesCount = 0;

  ngOnInit(): void {
    this.getJson(true)
    this.sort()
  }

  getJson(firstTime: any) {
    this.service.getJson().subscribe(
      {
        next: (res) => {
          this.list = res.results;
          this.newList = res.results;
          firstTime && this.list.forEach(i => {
            i.Year = i.Year.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
            i.Type == "movie" ? this.mediaCount++ : i.Type == "series" ? this.seriesCount++ : this.gamesCount++
          })
          firstTime ? this.types = [{ type: "all types", count: this.list.length }, { type: "movie", count: this.mediaCount }, { type: "series", count: this.seriesCount }, { type: "game", count: this.gamesCount }] : ""
        },
        error: (e) => console.error(e),
      }
    )
  }

  updateItem(event: any) {
    this.newList.forEach(i => {
      i.imdbID === event.id ? i.Title = event.title:""
    })

  }
  public setList(value: any) {
    value == "all types" ? this.list = this.newList : this.list = this.newList.filter(i => i.Type == value)
  }

  delete() {
    this.search = ""
  }

  sort() {
    this.sortByasc == true ? this.list = this.list.sort((a, b) => a.Title.localeCompare(b.Title)) :
      this.list = this.list.sort((one, two) => (one.Title > two.Title ? -1 : 1));
    console.log(this.sortByasc, this.list);
    this.sortByasc = !this.sortByasc;
  }

  refresh() {
    this.getJson(false)
  }

  changeToggle() {
    this.toggle = true
  }

  setGrid() {
    this.toggle = false
  }

}
