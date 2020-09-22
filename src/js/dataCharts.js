export const filterByCommonArtists = (data) => {
  let commonArrays = [];
  let flatData = data.flat();

  // compares each users songs to every other user and collects the songs by the artists they have in common
  do {
    let compare = data.shift();
    for (let user of data) {
      let compareArtists = compare.map((song) => song.artist);
      let userArtists = user.map((song) => song.artist);
      let common = compareArtists.filter((item) => userArtists.includes(item));
      commonArrays.push(common);
    }
  } while (data.length > 1);

  // filters duplicate artist names for filtration
  let commonArtists = Array.from(new Set(commonArrays.flat()));

  // filters the raw data set down to only the songs that are shared
  let filteredData = flatData.filter((song) =>
    commonArtists.includes(song.artist)
  );

  // sorts the output playlist by artist alphabetically
  let sortedData = filteredData.sort(function (a, b) {
    let artistA = a.artist.toUpperCase();
    let artistB = b.artist.toUpperCase();
    if (artistA < artistB) return -1;
    if (artistA > artistB) return 1;
    return 0;
  });

  // this bit filters the dupes that are caused by two people having the same song in their playlist
  // and also the duplicates that arise from on person having the same song twice in their playlist
  sortedData.forEach((song, i, data) => {
    for (let s of data) {
      if (data.indexOf(s) !== i && Object.values(s).indexOf(song.name) > -1) {
        data.splice(data.indexOf(s), 1);
      }
    }
  });

  console.log(sortedData);
  return sortedData;
};

// this was an idea i had to have like one monolith function the returns an object with all the datasets for all charts
export const processData = async (apiCall) => {
  let data = await apiCall;
  // dataProcessingFunctions(data) go here
  // another one,
};

const getAvgPopularity = (data) => {
  data = data.flat();
  let sumPopular = data
    .map((el) => el.popularity)
    .reduce((acc, val) => acc + val, 0);
  return sumPopular / data.length;
};

export const getAvgPopularityByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  // data = filterByCommonArtists(data);
  let dataSet = [];
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let usersSongs = data.filter((song) => song.username === user);
    let usersPopularity = usersSongs
      .map((el) => el.popularity)
      .reduce((acc, val) => acc + val, 0);
    let truncate =
      Math.floor((usersPopularity / usersSongs.length) * 100) / 100;
    dataSet.push(truncate);
  }
  return [userNames, dataSet];
};

export const getNumTracksByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  let dataSet = [];
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let contributed = data.filter((song) => song.username === user);
    dataSet.push(contributed.length);
  }
  return [userNames, dataSet];
};


export const getDecadesByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  let dataSet = [];
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let usersSongs = data.filter((song) => song.username === user);
    let dates = {
      "20s": 0,
      "10s": 0,
      "00s": 0,
      "90s": 0,
      "80s": 0,
      "70s": 0,
      "60s": 0,
      "50s": 0,
    };
    for (let song of usersSongs) {
      switch (true) {
        case /\d{2}2\d-\d{2}-\d{2}/.test(song.release_date):
          dates["20s"]++;
          break;
        case /\d{2}1\d-\d{2}-\d{2}/.test(song.release_date):
          dates["10s"]++;
          break;
        case /\d{2}0\d-\d{2}-\d{2}/.test(song.release_date):
          dates["00s"]++;
          break;
        case /\d{2}9\d-\d{2}-\d{2}/.test(song.release_date):
          dates["90s"]++;
          break;
        case /\d{2}8\d-\d{2}-\d{2}/.test(song.release_date):
          dates["80s"]++;
          break;
        case /\d{2}7\d-\d{2}-\d{2}/.test(song.release_date):
          dates["70s"]++;
          break;
        case /\d{2}6\d-\d{2}-\d{2}/.test(song.release_date):
          dates["60s"]++;
          break;
        case /\d{2}5\d-\d{2}-\d{2}/.test(song.release_date):
          dates["50s"]++;
          break;
        // skip songs with missing date data
        default:
          break;
      }
    }
    dataSet.push(Object.values(dates));
  }
  return [userNames, dataSet];
};

export const getNumTracksByArtist = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  let dataSet = [];
  let artists = Array.from(new Set(data.map((el) => el.artist)));
  for (let artist of artists) {
    dataSet.push(data.filter((el) => el.artist === artist).length);
  }
  return [artists, dataSet];
};


export var globalColorStrings = {
  aliceblue: 'rgba(240, 248, 255, 1)',
  antiquewhite: 'rgba(250, 235, 215, 1)',
  aqua: 'rgba(0, 255, 255, 1)',
  aquamarine: 'rgba(127, 255, 212, 1)',
  azure: 'rgba(240, 255, 255, 1)',
  beige: 'rgba(245, 245, 220, 1)',
  bisque: 'rgba(255, 228, 196, 1)',
  black: 'rgba(0, 0, 0, 1)',
  blanchedalmond: 'rgba(255, 235, 205, 1)',
  blue: 'rgba(0, 0, 255, 1)',
  blueviolet: 'rgba(138, 43, 226, 1)',
  brown: 'rgba(165, 42, 42, 1)',
  burlywood: 'rgba(222, 184, 135, 1)',
  cadetblue: 'rgba(95, 158, 160, 1)',
  chartreuse: 'rgba(127, 255, 0, 1)',
  chocolate: 'rgba(210, 105, 30, 1)',
  coral: 'rgba(255, 127, 80, 1)',
  cornflowerblue: 'rgba(100, 149, 237, 1)',
  cornsilk: 'rgba(255, 248, 220, 1)',
  crimson: 'rgba(220, 20, 60, 1)',
  cyan: 'rgba(0, 255, 255, 1)',
  darkblue: 'rgba(0, 0, 139, 1)',
  darkcyan: 'rgba(0, 139, 139, 1)',
  darkgoldenrod: 'rgba(184, 134, 11, 1)',
  darkgray: 'rgba(169, 169, 169, 1)',
  darkgreen: 'rgba(0, 100, 0, 1)',
  darkgrey: 'rgba(169, 169, 169, 1)',
  darkkhaki: 'rgba(189, 183, 107, 1)',
  darkmagenta: 'rgba(139, 0, 139, 1)',
  darkolivegreen: 'rgba(85, 107, 47, 1)',
  darkorange: 'rgba(255, 140, 0, 1)',
  darkorchid: 'rgba(153, 50, 204, 1)',
  darkred: 'rgba(139, 0, 0, 1)',
  darksalmon: 'rgba(233, 150, 122, 1)',
  darkseagreen: 'rgba(143, 188, 143, 1)',
  darkslateblue: 'rgba(72, 61, 139, 1)',
  darkslategray: 'rgba(47, 79, 79, 1)',
  darkslategrey: 'rgba(47, 79, 79, 1)',
  darkturquoise: 'rgba(0, 206, 209, 1)',
  darkviolet: 'rgba(148, 0, 211, 1)',
  deeppink: 'rgba(255, 20, 147, 1)',
  deepskyblue: 'rgba(0, 191, 255, 1)',
  dimgray: 'rgba(105, 105, 105, 1)',
  dimgrey: 'rgba(105, 105, 105, 1)',
  dodgerblue: 'rgba(30, 144, 255, 1)',
  firebrick: 'rgba(178, 34, 34, 1)',
  floralwhite: 'rgba(255, 250, 240, 1)',
  forestgreen: 'rgba(34, 139, 34, 1)',
  fuchsia: 'rgba(255, 0, 255, 1)',
  gainsboro: 'rgba(220, 220, 220, 1)',
  ghostwhite: 'rgba(248, 248, 255, 1)',
  gold: 'rgba(255, 215, 0, 1)',
  goldenrod: 'rgba(218, 165, 32, 1)',
  gray: 'rgba(128, 128, 128, 1)',
  green: 'rgba(0, 128, 0, 1)',
  greenyellow: 'rgba(173, 255, 47, 1)',
  grey: 'rgba(128, 128, 128, 1)',
  honeydew: 'rgba(240, 255, 240, 1)',
  hotpink: 'rgba(255, 105, 180, 1)',
  indianred: 'rgba(205, 92, 92, 1)',
  indigo: 'rgba(75, 0, 130, 1)',
  ivory: 'rgba(255, 255, 240, 1)',
  khaki: 'rgba(240, 230, 140, 1)',
  lavender: 'rgba(230, 230, 250, 1)',
  lavenderblush: 'rgba(255, 240, 245, 1)',
  lawngreen: 'rgba(124, 252, 0, 1)',
  lemonchiffon: 'rgba(255, 250, 205, 1)',
  lightblue: 'rgba(173, 216, 230, 1)',
  lightcoral: 'rgba(240, 128, 128, 1)',
  lightcyan: 'rgba(224, 255, 255, 1)',
  lightgoldenrodyellow: 'rgba(250, 250, 210, 1)',
  lightgray: 'rgba(211, 211, 211, 1)',
  lightgreen: 'rgba(144, 238, 144, 1)',
  lightgrey: 'rgba(211, 211, 211, 1)',
  lightpink: 'rgba(255, 182, 193, 1)',
  lightsalmon: 'rgba(255, 160, 122, 1)',
  lightseagreen: 'rgba(32, 178, 170, 1)',
  lightskyblue: 'rgba(135, 206, 250, 1)',
  lightslategray: 'rgba(119, 136, 153, 1)',
  lightslategrey: 'rgba(119, 136, 153, 1)',
  lightsteelblue: 'rgba(176, 196, 222, 1)',
  lightyellow: 'rgba(255, 255, 224, 1)',
  lime: 'rgba(0, 255, 0, 1)',
  limegreen: 'rgba(50, 205, 50, 1)',
  linen: 'rgba(250, 240, 230, 1)',
  magenta: 'rgba(255, 0, 255, 1)',
  maroon: 'rgba(128, 0, 0, 1)',
  mediumaquamarine: 'rgba(102, 205, 170, 1)',
  mediumblue: 'rgba(0, 0, 205, 1)',
  mediumorchid: 'rgba(186, 85, 211, 1)',
  mediumpurple: 'rgba(147, 112, 219, 1)',
  mediumseagreen: 'rgba(60, 179, 113, 1)',
  mediumslateblue: 'rgba(123, 104, 238, 1)',
  mediumspringgreen: 'rgba(0, 250, 154, 1)',
  mediumturquoise: 'rgba(72, 209, 204, 1)',
  mediumvioletred: 'rgba(199, 21, 133, 1)',
  midnightblue: 'rgba(25, 25, 112, 1)',
  mintcream: 'rgba(245, 255, 250, 1)',
  mistyrose: 'rgba(255, 228, 225, 1)',
  moccasin: 'rgba(255, 228, 181, 1)',
  navajowhite: 'rgba(255, 222, 173, 1)',
  navy: 'rgba(0, 0, 128, 1)',
  oldlace: 'rgba(253, 245, 230, 1)',
  olive: 'rgba(128, 128, 0, 1)',
  olivedrab: 'rgba(107, 142, 35, 1)',
  orange: 'rgba(255, 165, 0, 1)',
  orangered: 'rgba(255, 69, 0, 1)',
  orchid: 'rgba(218, 112, 214, 1)',
  palegoldenrod: 'rgba(238, 232, 170, 1)',
  palegreen: 'rgba(152, 251, 152, 1)',
  paleturquoise: 'rgba(175, 238, 238, 1)',
  palevioletred: 'rgba(219, 112, 147, 1)',
  papayawhip: 'rgba(255, 239, 213, 1)',
  peachpuff: 'rgba(255, 218, 185, 1)',
  peru: 'rgba(205, 133, 63, 1)',
  pink: 'rgba(255, 192, 203, 1)',
  plum: 'rgba(221, 160, 221, 1)',
  powderblue: 'rgba(176, 224, 230, 1)',
  purple: 'rgba(128, 0, 128, 1)',
  rebeccapurple: 'rgba(102, 51, 153, 1)',
  red: 'rgba(255, 0, 0, 1)',
  rosybrown: 'rgba(188, 143, 143, 1)',
  royalblue: 'rgba(65, 105, 225, 1)',
  saddlebrown: 'rgba(139, 69, 19, 1)',
  salmon: 'rgba(250, 128, 114, 1)',
  sandybrown: 'rgba(244, 164, 96, 1)',
  seagreen: 'rgba(46, 139, 87, 1)',
  seashell: 'rgba(255, 245, 238, 1)',
  sienna: 'rgba(160, 82, 45, 1)',
  silver: 'rgba(192, 192, 192, 1)',
  skyblue: 'rgba(135, 206, 235, 1)',
  slateblue: 'rgba(106, 90, 205, 1)',
  slategray: 'rgba(112, 128, 144, 1)',
  slategrey: 'rgba(112, 128, 144, 1)',
  snow: 'rgba(255, 250, 250, 1)',
  springgreen: 'rgba(0, 255, 127, 1)',
  steelblue: 'rgba(70, 130, 180, 1)',
  tan: 'rgba(210, 180, 140, 1)',
  teal: 'rgba(0, 128, 128, 1)',
  thistle: 'rgba(216, 191, 216, 1)',
  tomato: 'rgba(255, 99, 71, 1)',
  turquoise: 'rgba(64, 224, 208, 1)',
  violet: 'rgba(238, 130, 238, 1)',
  wheat: 'rgba(245, 222, 179, 1)',
  white: 'rgba(255, 255, 255, 1)',
  whitesmoke: 'rgba(245, 245, 245, 1)',
  yellow: 'rgba(255, 255, 0, 1)',
  yellowgreen: 'rgba(154, 205, 50, 1)'
}