//
//  MediaCardsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/20.
//

import SwiftUI
import Kingfisher

struct MediaCardsView: View {
    private var title: String
    private var card_list: [MediaItem]
    private var media_type: String
    
    @ObservedObject var watchlistVM = WatchlistViewModel()
    
    @Environment(\.openURL) var openURL
    
    @Binding var showToast: Bool
    @Binding var isAddTo: Bool
    @Binding var media_title: String
    
    init(title: String, card_list: [MediaItem], media_type: String, showToast: Binding<Bool>, isAddTo: Binding<Bool>, media_title: Binding<String>) {
        self.title = title
        self.card_list = card_list
        self.media_type = media_type
        self._showToast = showToast
        self._isAddTo = isAddTo
        self._media_title = media_title
    }
    var body: some View {
        VStack(alignment: .leading) {
            Text(self.title)
                .font(.title2)
                .bold()
            
            ScrollView(.horizontal) {
                HStack(alignment: .top) {
                        ForEach(self.card_list, id: \.id) {item in
                            NavigationLink(destination: DetailsView(media_type: self.media_type, media_id: item.id)) {
                                VStack {
                                    KFImage(URL(string: item.poster_path))
                                        .resizable()
                                        .frame(width: 96, height: 130)
                                        .aspectRatio(contentMode: .fit)
                                        .clipped()
                                        .cornerRadius(8)
                                    Text(item.title)
                                        .font(.footnote)
                                        .foregroundColor(.black)
                                        .bold()
                                    Text("(" + item.year + ")")
                                        .font(.footnote)
                                        .foregroundColor(.secondary)
                                        .multilineTextAlignment(.center)
                                }
                                .frame(width: 96)
                                .padding(.trailing, 18)
                                .contextMenu {
                                    Button(action: {
                                        if watchlistVM.checkIfExist(id: item.id, media_type: self.media_type) {
                                            watchlistVM.removedFromWatchlist(id: item.id, media_type: self.media_type)
                                            self.showToast = true
                                            self.isAddTo = false
                                            self.media_title = item.title
                                        }
                                        else {
                                            watchlistVM.addToWatchlist(id: item.id, media_type: self.media_type, poster_path: item.poster_path)
                                            self.showToast = true
                                            self.isAddTo = true
                                            self.media_title = item.title
                                        }
                                    }) {
                                        if watchlistVM.checkIfExist(id: item.id, media_type: self.media_type) {
                                            Label("Remove from watchList", systemImage: "bookmark.fill")
                                        }
                                        else {
                                            Label("Add to watchList", systemImage: "bookmark")
                                        }
                                    }
                                    
                                    Button(action: {
                                        let url_share_on_fb: String = "https://www.facebook.com/sharer/sharer.php?u=https://themoviedb.org/" + self.media_type + "/" + String(item.id)
                                        openURL(URL(string: url_share_on_fb)!)
                                    }) {
                                        Label("Share on Facebook", image: "icon_fb")
                                    }
                                    
                                    Button(action: {
                                        let url_share_on_tw: String = ("http://twitter.com/intent/tweet?text=Check out this link: &url=https://themoviedb.org/" + self.media_type + "/" + String(item.id) + "&hashtags=CSCI571USCFilms").replacingOccurrences(of: " ", with: "%20")
                                        openURL(URL(string: url_share_on_tw)!)
                                    }) {
                                        Label("Share on Twitter", image: "icon_tw")
                                    }
                                }
                            }
                            .buttonStyle(PlainButtonStyle())
                            
                        }
                }
            }
        }
    }
}

