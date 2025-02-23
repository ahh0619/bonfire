import { Dispatch } from 'react';

export const facilSearch = (
  lat: number,
  lon: number,
  setFacilSearchResult: Dispatch<kakao.maps.services.PlacesSearchResult | []>,
  code: `${kakao.maps.CategoryCode}`,
) => {
  window.kakao.maps.load(() => {
    const places = new window.kakao.maps.services.Places();
    const callback = (
      result: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status,
      _: kakao.maps.Pagination,
    ) => {
      const Swal = require('sweetalert2');
      if (status === 'OK') {
        console.log('검색 결과:', result);
        console.log(result);
        setFacilSearchResult(result);
      } else {
        if (status === 'ZERO_RESULT') {
          Swal.fire({
            icon: 'error',
            text: '검색 결과가 존재하지 않습니다.',
            confirmButtonColor: '#FD470E',
          });
        }
        console.error('검색 실패:', status);
      }
    };

    places.categorySearch(code, callback, {
      location: new window.kakao.maps.LatLng(lat, lon),
      radius: 2000,
    });
  });
};
