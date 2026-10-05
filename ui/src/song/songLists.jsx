import React from 'react'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined'
import RepeatIcon from '@material-ui/icons/Repeat'
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import config from '../config'

// Preset views of the song list, mirroring the album lists. Each entry is a
// set of query params for the `/song` route (sort, order and filter).
const songLists = {
  all: {
    icon: <MusicNoteOutlinedIcon />,
    params: 'sort=title&order=ASC&filter={}',
  },
  random: {
    icon: <ShuffleIcon />,
    params: 'sort=random&order=ASC&filter={}',
  },
  ...(config.enableFavourites && {
    starred: {
      icon: <FavoriteBorderIcon />,
      params: 'sort=starred_at&order=DESC&filter={"starred":true}',
    },
  }),
  ...(config.enableStarRating && {
    topRated: {
      icon: <StarBorderIcon />,
      params: 'sort=rating&order=DESC&filter={"has_rating":true}',
    },
  }),
  recentlyAdded: {
    icon: <LibraryAddOutlinedIcon />,
    params: 'sort=recently_added&order=DESC&filter={}',
  },
  recentlyPlayed: {
    icon: <VideoLibraryOutlinedIcon />,
    params: 'sort=play_date&order=DESC&filter={"played":true}',
  },
  mostPlayed: {
    icon: <RepeatIcon />,
    params: 'sort=play_count&order=DESC&filter={"played":true}',
  },
}

// A menu entry is active when the current /song URL carries the same sort and
// filter as the preset (extra params such as page or perPage are ignored).
export const isSongListActive = (type) => (_match, location) => {
  if (location.pathname !== '/song') {
    return false
  }
  const current = new URLSearchParams(location.search)
  const preset = new URLSearchParams(songLists[type].params)
  return (
    current.get('sort') === preset.get('sort') &&
    current.get('filter') === preset.get('filter')
  )
}

export default songLists
