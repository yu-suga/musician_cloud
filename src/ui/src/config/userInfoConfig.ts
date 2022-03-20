import areaMaster from './areaConst.json';
import genreMaster from './genreConst.json';
import musicPartMaster from './musicPartConst.json';

export type mst = {
  [id: number]: string;
};

/** 都道府県マスタ */
let cityMst: mst = areaMaster.area;

export const fetchArea = (areaId: number) => {
  return cityMst[areaId];
};

/** ジャンルマスタ */
let genreMst: mst = genreMaster.genre;

export const fetchGenre = (genreId: number) => {
  return genreMst[genreId];
};

/** 音楽パートマスタ */
let partMst: mst = musicPartMaster.part;

export const fetchPart = (partId: number) => {
  return partMst[partId];
};
