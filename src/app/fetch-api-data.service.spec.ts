import { TestBed } from '@angular/core/testing';

import { fetchApiData } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: fetchApiData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fetchApiData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
