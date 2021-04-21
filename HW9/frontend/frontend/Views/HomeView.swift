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
    @State private var nextShowMovieView = false   // default next show is TV Shows
    @State private var trailingContent: String = "TV shows"
    @State private var carouselTitle: String = "Now Playing"
    
    @ObservedObject var homeVM = HomeViewModel()
    
    init() {
        homeVM.fetchHomeMovieData()
    }
    
    var body: some View {
        NavigationView {
            ScrollView(.vertical) {
                VStack() {
                    CarouselView(homeVM.now_playing_list, self.carouselTitle)
                    
                    MediaCardsView(title: "Top Rated", card_list: homeVM.top_rated_list)
                    
                    MediaCardsView(title: "Popular", card_list: homeVM.popular_list)
                    
                }
            }
            .navigationTitle("USC Films")
            .navigationBarItems(
                trailing:
                    Button(self.trailingContent){
                        if(nextShowMovieView) {
                            homeVM.fetchHomeMovieData()
                            self.trailingContent = "TV shows"
                            nextShowMovieView = false
                            self.carouselTitle = "Now Playing"
                        }
                        else {
                            homeVM.fetchHomeTvData()
                            self.trailingContent = "Movies"
                            nextShowMovieView = true
                            self.carouselTitle = "Trending"
                        }
                    })
            
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .padding()
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
