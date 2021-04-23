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
    
    @ObservedObject var detailsVM = DetailsViewModel()
    
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
            VStack {
                Text(detailsVM.details!.title)
                    .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                    .bold()
                    .multilineTextAlignment(/*@START_MENU_TOKEN@*/.leading/*@END_MENU_TOKEN@*/)
                    
                
            }
        }
    }
}
