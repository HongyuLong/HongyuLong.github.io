//
//  HomeView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import SwiftUI
import SwiftyJSON
import Kingfisher

struct HomeView: View {
    
    var media: String = "movie"
    
    var body: some View {
        HomeMovieView()
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
