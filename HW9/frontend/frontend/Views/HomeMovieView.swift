//
//  HomeMovieView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI

struct HomeMovieView: View {
    @ObservedObject var homeVM = HomeViewModel()
    
    init() {
        homeVM.fetchHomeMovieData()
    }
    
    var body: some View {
        ScrollView(.vertical) {
            VStack(alignment: .leading) {
                Text("USC Films")
                    .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                    .bold()
                    .padding(.bottom, 4)
                
                CarouselView(homeVM.now_playing_list, "Trending")
                
                MediaCardsView(title: "Top Rated", card_list: homeVM.top_rated_mv_list)
                
                MediaCardsView(title: "Popular", card_list: homeVM.popular_mv_list)
                
            }
            
        }
        .padding()
    }
}

