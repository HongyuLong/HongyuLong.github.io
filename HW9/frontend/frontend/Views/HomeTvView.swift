//
//  HomeTvView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI

struct HomeTvView: View {
    @ObservedObject var homeVM = HomeViewModel()
    
    init() {
        homeVM.fetchHomeTvData()
    }
    
    var body: some View {
        ScrollView(.vertical) {
            VStack(alignment: .leading) {
                Text("USC Films")
                    .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                    .bold()
                    .padding(.bottom, 4)
                
                CarouselView(homeVM.airing_today_list, "Trending")
                
                MediaCardsView(title: "Top Rated", card_list: homeVM.top_rated_tv_list)
                
                MediaCardsView(title: "Popular", card_list: homeVM.popular_tv_list)
                
            }
            
        }
        .padding()
    }
}
