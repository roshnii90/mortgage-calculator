import { Component, AfterViewInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';


@Component({
  selector:'mortgage-calc',
  templateUrl: './mortgage.component.html',
   styleUrls: [ './mortgage.component.scss'],
})
export class MortgageComponent implements AfterViewInit {
 public filters: any;
 public principalAmt = {
  value: 1
};
public interest = {
  value: 8.5
}
public tenureYrs = {
  value: 20
}
public tenureMths = {
  value: 240
}


public  query = {
    amount: "",
    interest: 1,
    tenureYr: 1,
    tenureMo: 1
  }

 public result = {
    principal: "",
    emi: "",
    interest: "",
    total: ""
  }
  public yrToggle: boolean;
  public poptions: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }
  };
  constructor() {
    this.yrToggle = true;
  }

  ngOnInit() {
 
  }

  ngAfterViewInit() {
    this.refresh();
  }

  public enforceMinMax(el: any){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  }

  public update(id: any) {
    if (id == 0) {
      this.principalAmt.value = (Number(this.query.amount) / 100000);
    }
    else if (id == 1) {
      this.interest.value = this.query.interest;
    }
    else if (id == 2) {
      this.tenureYrs.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.tenureMths.value = this.query.tenureMo;
    }
    this.refresh();
  }

 public refresh() {

    var loanAmount = Number(this.principalAmt.value) * 100000;
    var numberOfMonths = (this.yrToggle) ? (Number(this.tenureYrs.value) * 12) : Number(this.tenureMths.value);
    var rateOfInterest = Number(this.interest.value);
    var monthlyInterestRatio = (rateOfInterest / 100) / 12;

    this.query.amount = loanAmount.toString();
    this.query.interest = rateOfInterest;
    if (this.yrToggle) {
      this.query.tenureYr = this.tenureYrs.value;
    }
    else {
      this.query.tenureMo = this.tenureMths.value;
    }

    var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;
    var principle  = this.query.amount;
    this.result.principal =principle.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

