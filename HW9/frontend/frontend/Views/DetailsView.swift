//
//  DetailsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI

struct DetailsView: View {
    private var media_type: String
    private var media_id: Int
    @State private var isShowMore: Bool = false
    
    @ObservedObject var detailsVM = DetailsViewModel()
    @EnvironmentObject var watchlistVM: WatchlistViewModel
    
    init(media_type: String, media_id: Int) {
        self.media_type = media_type
        self.media_id = media_id
    }
    var body: some View {
        if detailsVM.fetched == false {
            ProgressView("Fetching Data...")
                .onAppear(perform: {
                    detailsVM.fetchAllData(media_type: self.media_type, media_id: self.media_id)
                })
        }
        else {
            ScrollView(.vertical) {
                VStack(alignment: .leading) {
                    VideoView()
                    
                    Text(detailsVM.details!.title)
                        .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                        .bold()
                        .padding(.top, 6)
                        .padding(.bottom, 6)
                        .fixedSize(horizontal: false, vertical: /*@START_MENU_TOKEN@*/true/*@END_MENU_TOKEN@*/)
                        .multilineTextAlignment(.leading)
                    
                    Text(detailsVM.details!.year + " | " + detailsVM.details!.genres)
                    
                    HStack {
                        Image(systemName: "star.fill").foregroundColor(.red)
                        Text(String(format: "%.1f", detailsVM.details!.vote_average) + "/5.0")
                    }
                    .padding(.top, 6)
                    .padding(.bottom, 6)
                    
                    if(detailsVM.details!.overview != "") {
                        if isShowMore {
                            Text(detailsVM.details!.overview)
                                .fixedSize(horizontal: false, vertical: /*@START_MENU_TOKEN@*/true/*@END_MENU_TOKEN@*/)
                            HStack() {
                                Spacer()
                                Button(action: {
                                    isShowMore = false
                                }, label: {
                                    Text("Show less")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .bold()
                                })
                            }
                        }
                        else {
                            Text(detailsVM.details!.overview)
                                .lineLimit(3)
                            
                            HStack() {
                                Spacer()
                                Button(action: {
                                    isShowMore = true
                                }, label: {
                                    Text("Show more..")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .bold()
                                })
                            }
                        }
                    }
                    
                    if detailsVM.hasCasts {
                        CastsView()
                    }
                    
                    if detailsVM.hasReviews {
                        ReviewsView()
                    }
                    
                    if detailsVM.hasRecommend {
                        RecommendView(media_type: self.media_type)
                    }
                    Spacer()
                }
                .navigationBarItems(
                    trailing:
                        HStack {
                            Button(action: {
                                if(watchlistVM.checkIfExist(id: self.media_id, media_type: self.media_type)) {
                                    watchlistVM.removedFromWatchlist(id: self.media_id, media_type: self.media_type)
                                }
                                else {
                                    watchlistVM.addToWatchlist(id: self.media_id,
                                                               media_type: self.media_type,
                                                               poster_path: detailsVM.details!.poster_path)
                                }
                            }, label: {
                                if(watchlistVM.checkIfExist(id: self.media_id, media_type: self.media_type)) {
                                    Image(systemName: "bookmark.fill")
                                }
                                else {
                                    Image(systemName: "bookmark")
                                }
                            })
                        }
                )
                .padding()
                .environmentObject(detailsVM)
            }
        }
    }
}
