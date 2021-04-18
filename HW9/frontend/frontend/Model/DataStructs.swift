//
//  MovieCard.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import Foundation

// Card for Movie and Tv
struct NowPlayingCard: Codable, Identifiable {
    var id: Int
    var title: String
    var poster_path: String
}

// Card for Movie and Tv
struct MovieCard: Codable, Identifiable {
    var id: Int
    var title: String
    var year: Int
    var poster_path: String
}



